import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { getEmbedding } from '@/lib/api/embedding';
import { checkRateLimit, RATE_LIMITS } from '@/lib/api/rate-limit';
import { validateSearchParams, errorResponse, getClientIp, rateLimitResponse } from '@/lib/api/validate';

export async function GET(req: NextRequest) {
  const supabase = await createServerClient();

  // 鉴权
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return errorResponse('请先登录', 401);

  const ip = getClientIp(req);
  const { ok, remaining, retryAfter } = await checkRateLimit(`search:${user.id}`, RATE_LIMITS.search);
  if (!ok) return rateLimitResponse(retryAfter, { 'X-RateLimit-Remaining': '0' });

  const validation = validateSearchParams(req.nextUrl.searchParams);
  if (!validation.ok) return errorResponse(validation.error!);

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
