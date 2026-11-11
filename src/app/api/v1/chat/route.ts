import { NextRequest } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { getEmbedding } from '@/lib/api/embedding';
import { checkRateLimit, RATE_LIMITS } from '@/lib/api/rate-limit';
import { validateChatBody, errorResponse, rateLimitResponse } from '@/lib/api/validate';
import { env } from '@/lib/env';
import { buildSystemPrompt, formatRagContext, pickRelevantChunks, type KnowledgeChunk } from '@/lib/chat-persona';

const MIMO_KEY = env.MIMO_API_KEY;
const MIMO_ENDPOINT = 'https://token-plan-cn.xiaomimimo.com/anthropic/v1/messages';
const MODEL = 'mimo-v2.5-pro';

async function searchContext(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  query: string,
  subject?: string | null,
): Promise<string> {
  try {
    const embedding = await getEmbedding(query);
    // 多召回一些，再按学科过滤后取前 3 条
    const { data } = await supabase.rpc('search_knowledge', {
      query_embedding: embedding,
      match_count: 6,
      filter_module: null,
    });
    const chunks = pickRelevantChunks((data ?? []) as KnowledgeChunk[], subject);
    return formatRagContext(chunks.slice(0, 3));
  } catch (err) {
    console.error('RAG search error:', err);
    return '';
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createServerClient();

  // 鉴权
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return errorResponse('请先登录', 401);

  const { ok, retryAfter } = await checkRateLimit(`chat:${user.id}`, RATE_LIMITS.chat);
  if (!ok) return rateLimitResponse(retryAfter);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse('请求体不是合法 JSON');
  }

  const validation = validateChatBody(body);
  if (!validation.ok) return errorResponse(validation.error!);

  const { messages, context, subject } = validation;

  const lastUserMsg = [...messages!].reverse().find(m => m.role === 'user');
  const ragContext = lastUserMsg ? await searchContext(supabase, lastUserMsg.content, subject) : '';

  const systemPrompt = buildSystemPrompt({ subject, ragContext, context });

  const mimoResp = await fetch(MIMO_ENDPOINT, {
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
      messages: messages!.map(m => ({ role: m.role, content: m.content })),
      stream: true,
    }),
  });

  if (!mimoResp.ok) {
    const err = await mimoResp.text();
    console.error('MiMo API error:', err);
    return new Response(JSON.stringify({ error: 'AI 服务暂时不可用' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(mimoResp.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
