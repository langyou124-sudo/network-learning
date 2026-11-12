import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// 认证隔离开关：内容优先阶段默认关闭强制登录，所有内容可自由浏览。
// 商业化落地需要登录（进度云同步、付费内容）时，把下面改成 true 即可恢复路由保护。
const REQUIRE_AUTH = false;

const protectedPaths = ['/learn', '/quiz', '/mistakes', '/progress', '/settings', '/diagrams', '/explore'];

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (REQUIRE_AUTH && isProtected && !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
