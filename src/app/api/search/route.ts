import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ZHIPUAI_KEY = process.env.ZHIPUAI_API_KEY!;
const EMBEDDING_MODEL = 'embedding-3';

async function getEmbedding(text: string): Promise<number[]> {
  const resp = await fetch('https://open.bigmodel.cn/api/paas/v4/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ZHIPUAI_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text,
    }),
  });

  if (!resp.ok) {
    throw new Error(`Embedding API error: ${resp.status}`);
  }

  const data = await resp.json();
  return data.data[0].embedding;
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q');
  const moduleId = req.nextUrl.searchParams.get('module') || undefined;
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '5');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ error: '缺少搜索关键词' }, { status: 400 });
  }

  try {
    // 1. 将查询文本向量化
    const embedding = await getEmbedding(query.trim());

    // 2. 调 Supabase 搜索函数
    const { data, error } = await supabase.rpc('search_knowledge', {
      query_embedding: embedding,
      match_count: limit,
      filter_module: moduleId || null,
    });

    if (error) {
      console.error('Supabase search error:', error);
      return NextResponse.json({ error: '搜索失败' }, { status: 500 });
    }

    return NextResponse.json({
      query,
      results: data || [],
    });
  } catch (err) {
    console.error('Search error:', err);
    return NextResponse.json({ error: '搜索服务异常' }, { status: 500 });
  }
}
