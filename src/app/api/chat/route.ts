import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MIMO_KEY = process.env.MIMO_API_KEY!;
const MIMO_ENDPOINT = 'https://api.xiaomimimo.com/anthropic/v1/messages';
const MODEL = 'mimo-v2.5-pro';

// 向量化查询（复用 search route 的逻辑）
async function getEmbedding(text: string): Promise<number[]> {
  const resp = await fetch('https://open.bigmodel.cn/api/paas/v4/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ZHIPUAI_API_KEY}`,
    },
    body: JSON.stringify({ model: 'embedding-3', input: text }),
  });
  if (!resp.ok) throw new Error(`Embedding error: ${resp.status}`);
  const data = await resp.json();
  return data.data[0].embedding;
}

// RAG：搜索相关知识块
async function searchContext(query: string): Promise<string> {
  try {
    const embedding = await getEmbedding(query);
    const { data } = await supabase.rpc('search_knowledge', {
      query_embedding: embedding,
      match_count: 3,
      filter_module: null,
    });
    if (!data || data.length === 0) return '';
    return data.map((r: { chunk_text: string; metadata?: { topicTitle?: string } }) =>
      `【${r.metadata?.topicTitle || '相关知识'}】\n${r.chunk_text}`
    ).join('\n\n---\n\n');
  } catch {
    return '';
  }
}

export async function POST(req: NextRequest) {
  const { messages, context } = await req.json();

  if (!messages || messages.length === 0) {
    return new Response(JSON.stringify({ error: '缺少消息' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 取最后一条用户消息做 RAG
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
  const ragContext = lastUserMsg ? await searchContext(lastUserMsg.content) : '';

  // 构建系统提示
  let systemPrompt = `你是达博理智能学习助手，专注于网络工程和通信技术领域。
你的职责是帮助学生理解网络工程知识，包括OSI模型、TCP/IP协议、路由交换、网络安全等。
回答要求：
- 准确、简洁、通俗易懂
- 适当使用类比帮助理解
- 涉及技术细节时给出具体例子
- 如果问题超出网络工程范围，礼貌说明并尽量关联到网络领域`;

  if (ragContext) {
    systemPrompt += `\n\n以下是与用户问题相关的知识库内容，优先参考这些内容回答：\n\n${ragContext}`;
  }

  if (context) {
    systemPrompt += `\n\n用户当前正在学习的内容：\n${context}`;
  }

  // 调 MiMo API（流式）
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
      messages,
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

  // 直接透传 SSE 流
  return new Response(mimoResp.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
