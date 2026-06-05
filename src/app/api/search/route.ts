import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getEmbedding } from '@/lib/api/embedding';
import { checkRateLimit, RATE_LIMITS } from '@/lib/api/rate-limit';
import { validateSearchParams, errorResponse } from '@/lib/api/validate';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const { ok, remaining, retryAfter } = checkRateLimit(`search:${ip}`, RATE_LIMITS.search);

  if (!ok) {
    return NextResponse.json(
      { error: `请求太频繁，请 ${retryAfter} 秒后重试` },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfter), 'X-RateLimit-Remaining': '0' },
      }
    );
  }

  // 输入校验
  const validation = validateSearchParams(req.nextUrl.searchParams);
  if (!validation.ok) {
    return errorResponse(validation.error!);
  }

  const { query, limit, moduleId } = validation;

  try {
    const embedding = await getEmbedding(query!);

    const { data, error } = await supabase.rpc('search_knowledge', {
      query_embedding: embedding,
      match_count: limit,
      filter_module: moduleId || null,
    });

    if (error) {
      console.error('Supabase search error:', error);
      return NextResponse.json({ error: '搜索失败' }, { status: 500 });
    }

    return NextResponse.json(
      { query, results: data || [] },
      { headers: { 'X-RateLimit-Remaining': String(remaining) } }
    );
  } catch (err) {
    console.error('Search error:', err);
    return NextResponse.json({ error: '搜索服务异常' }, { status: 500 });
  }
}
