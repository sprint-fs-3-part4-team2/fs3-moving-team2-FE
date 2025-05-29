export const config = {
  matcher: [
    // _next/static, _next/image, favicon.ico 등 정적 파일을 제외
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg)$).*)',
  ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/server/auth/jwt';
import {
  checkProfileRegisterPath,
  handleTokenRefresh,
  checkAuthPath,
  checkVisitorAllowedPath,
} from './lib/server/auth/utils';
import { PROTECT } from './lib/server/auth/constants';
import { CustomJWTPayload } from './lib/server/auth/types';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isVisitorAllowedPath = checkVisitorAllowedPath(pathname);
  const isApiPath = pathname.startsWith('/api');
  let response = NextResponse.next();

  // 접근 가능한 경로거나 API 경로일 경우 토큰 검증 없이 통과
  if (isVisitorAllowedPath || isApiPath) return response;

  const isAuthPath = checkAuthPath(pathname);
  const isProfileRegisterPath = checkProfileRegisterPath(pathname);
  const token = request.cookies.get('accessToken')?.value;
  const reToken = request.cookies.get('refreshToken')?.value;
  const verifiedAccessToken = token
    ? await verifyToken<CustomJWTPayload>(token)
    : null;
  const loginUrl = new URL('/select-role', request.url);
  loginUrl.searchParams.set('warn', 'login');

  // 로그인이 안된 상태로 로그인 페이지가 아닌 페이지 접근 시
  if (!verifiedAccessToken && !reToken && !isAuthPath) {
    return NextResponse.redirect(loginUrl);
  }

  let currentUserData: CustomJWTPayload | null =
    verifiedAccessToken?.payload || null;

  // 토큰 리프레쉬
  if (!verifiedAccessToken && reToken) {
    try {
      const refreshResult = await handleTokenRefresh(reToken);
      response = refreshResult.response;
      currentUserData = refreshResult.refreshedToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.cookies.delete('refreshToken');
      return redirectResponse;
    }
  }

  const roleId = currentUserData?.roleId;
  const type = currentUserData?.type;

  // 프로필 등록이 필요할 때
  if (!roleId && !isAuthPath && !isProfileRegisterPath) {
    const urlPath = `/${type === 'customer' ? 'user' : 'mover'}/profile/register`;
    const redirectUrl = new URL(urlPath, request.url);
    redirectUrl.searchParams.set('warn', 'profileRegister');
    return NextResponse.redirect(redirectUrl);
  }

  const protectType = type === 'customer' ? PROTECT.CUSTOMER : PROTECT.MOVER;
  const authUserProtected = protectType.some((path) =>
    pathname.startsWith(path),
  );

  // 권한 없는 페이지 접근 또는 로그인한 상태에서 로그인/회원가입 페이지 이동 시
  if (currentUserData && (authUserProtected || isAuthPath)) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('warn', 'noAccess');
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
