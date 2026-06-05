import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { getEmbedding } from '@/lib/api/embedding';
import { checkRateLimit, RATE_LIMITS } from '@/lib/api/rate-limit';
import { validateSearchParams, errorResponse, getClientIp, rateLimitResponse } from '@/lib/api/validate';

const supabase = getSupabaseClient();

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const { ok, remaining, retryAfter } = checkRateLimit(`search:${ip}`, RATE_LIMITS.search);
  if (!ok) return rateLimitResponse(retryAfter, { 'X-RateLimit-Remaining': '0' });

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
