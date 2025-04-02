export const config = {
  matcher: [
    // _next/static, _next/image, favicon.ico 등 정적 파일을 제외
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg)$).*)',
  ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { UserType } from '@/components/authPage/common.types';

const PROTECT = {
  NO_USER: [
    '/mover/',
    '/user/quotes/request',
    '/user/quotes',
    '/user/profile',
    '/user/movers',
    '/user/reviews',
  ], // 로그인 안 했을 때
  CUSTOMER: ['/mover'], // 고객이 권한 없는 페이지
  MOVER: ['/user/'], // 기사가 권한 없는 페이지
};

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;
  const { cookies, url } = request;
  const token = cookies.get('accessToken')?.value;
  const authQuery = '?auth=no';

  if (!token) {
    const nouserProtected =
      PROTECT.NO_USER.some((path) => pathname.startsWith(path)) &&
      !pathname.includes('sign-in') &&
      !pathname.includes('sign-up');

    if (nouserProtected) {
      const loginUrl = new URL(
        '/select-role' + authQuery + '&type=nouser',
        url,
      );
      return NextResponse.redirect(loginUrl);
    }
    return res;
  }

  if (token) {
    const decode = jwtDecode(token) as CustomJWTPayload;

    if (!decode) return res;
    const protectType =
      decode.type === 'customer' ? PROTECT.CUSTOMER : PROTECT.MOVER;
    const authUserProtected = protectType.some((path) =>
      pathname.includes(path),
    );
    const userType = `&type=${decode.type}`;

    if (
      pathname.includes('sign-in') ||
      pathname.includes('sign-up') ||
      pathname.includes('select-role')
    ) {
      return NextResponse.redirect(new URL('/' + authQuery + userType, url));
    }

    if (authUserProtected) {
      const referer = request.headers.get('referer');

      if (referer) {
        return NextResponse.redirect(
          new URL(referer + authQuery + userType, url),
        );
      } else {
        return NextResponse.redirect(new URL('/' + authQuery + userType, url));
      }
    }
  }
  return res;
}
interface CustomJWTPayload {
  userId: string;
  type: UserType;
  roleId: string;
  iat: number;
  exp: number;
}
