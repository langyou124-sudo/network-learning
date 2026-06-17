import { NextRequest } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { checkRateLimit, RATE_LIMITS } from '@/lib/api/rate-limit';
import { validateEvaluateBody, errorResponse, rateLimitResponse } from '@/lib/api/validate';

const MIMO_KEY = process.env.MIMO_API_KEY!;
const MIMO_ENDPOINT = 'https://api.xiaomimimo.com/anthropic/v1/messages';
const MODEL = 'mimo-v2.5-pro';

interface EvaluationResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  keyPointsCovered: string[];
  keyPointsMissed: string[];
  modelAnswer: string;
  deepAnalysis: string;
}

function buildSystemPrompt(question: string, keyPoints: string[]): string {
  return `你是一位经验丰富的马克思主义理论教师，正在批改学生的考试答卷。

【评分标准】
- 理论准确性（40%）：马克思主义基本概念、原理表述是否正确
- 逻辑严密性（30%）：论述是否有条理、推理是否合理
- 理论联系实际（20%）：是否结合实际案例或社会现象进行分析
- 表述规范性（10%）：语言是否通顺、用词是否专业

【题目】
${question}

【参考要点】
${keyPoints.map((kp, i) => `${i + 1}. ${kp}`).join('\n')}

【输出要求】
请严格按照以下 JSON 格式输出评阅结果，不要输出任何其他内容：
{
  "score": <1-10的整数>,
  "strengths": ["优点1", "优点2"],
  "weaknesses": ["不足1", "不足2"],
  "keyPointsCovered": ["已覆盖的要点"],
  "keyPointsMissed": ["遗漏的要点"],
  "modelAnswer": "示范答案（200-400字）",
  "deepAnalysis": "从马克思主义视角进行深入分析，指出学生答案中可以深化的理论方向（150-300字）"
}

注意：
1. score 根据四个维度综合打分，6分及格，8分以上优秀
2. strengths 和 weaknesses 各列 2-4 条，具体且有针对性
3. keyPointsCovered 和 keyPointsMissed 根据参考要点逐一对照
4. modelAnswer 要完整、规范，体现马克思主义理论素养
5. deepAnalysis 要引用马克思原著或核心概念进行深度剖析
6. 所有内容用中文输出`;
}

export async function POST(req: NextRequest) {
  const supabase = await createServerClient();

  // 鉴权
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return errorResponse('请先登录', 401);

  const { ok, retryAfter } = await checkRateLimit(`evaluate:${user.id}`, RATE_LIMITS.evaluate);
  if (!ok) return rateLimitResponse(retryAfter);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse('请求体不是合法 JSON');
  }

  const validation = validateEvaluateBody(body);
  if (!validation.ok) return errorResponse(validation.error!);

  const { questionId, studentAnswer, question, keyPoints } = validation;

  const systemPrompt = buildSystemPrompt(question!, keyPoints!);

  let mimoResp: Response;
  try {
    mimoResp = await fetch(MIMO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MIMO_KEY}`,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: studentAnswer! }],
        stream: false,
      }),
    });
  } catch (err) {
    console.error('MiMo API fetch error:', err);
    return errorResponse('AI 服务暂时不可用', 502);
  }

  if (!mimoResp.ok) {
    const errText = await mimoResp.text();
    console.error('MiMo API error:', errText);
    return errorResponse('AI 服务暂时不可用', 502);
  }

  const mimoData = await mimoResp.json();
  const rawContent: string = mimoData?.content?.[0]?.text ?? '';

  let result: EvaluationResult;
  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    result = JSON.parse(jsonMatch[0]);

    // Validate and clamp score
    if (typeof result.score !== 'number' || result.score < 1 || result.score > 10) {
      result.score = Math.max(1, Math.min(10, Math.round(Number(result.score) || 5)));
    }
    result.score = Math.round(result.score);
  } catch (err) {
    console.error('Failed to parse MiMo evaluation response:', rawContent, err);
    return errorResponse('AI 评阅结果解析失败，请重试', 502);
  }

  return Response.json({
    questionId,
    score: result.score,
    strengths: result.strengths ?? [],
    weaknesses: result.weaknesses ?? [],
    keyPointsCovered: result.keyPointsCovered ?? [],
    keyPointsMissed: result.keyPointsMissed ?? [],
    modelAnswer: result.modelAnswer ?? '',
    deepAnalysis: result.deepAnalysis ?? '',
  });
}
