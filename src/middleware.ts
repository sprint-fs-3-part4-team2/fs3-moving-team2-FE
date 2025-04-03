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
    '/user/quotes/',
    '/user/profile',
    '/user/reviews',
  ], // 로그인 안 했을 때
  CUSTOMER: ['/mover/'], // 고객이 권한 없는 페이지
  MOVER: ['/user/'], // 기사가 권한 없는 페이지
};

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;
  const { cookies, url } = request;
  const token = cookies.get('accessToken')?.value;
  const authQuery = '?warn=login';
  const noAccess = '?warn=noAccess';

  // dev 환경에선 미들웨어 막기
  if (process.env.NODE_ENV === 'development') return res;

  if (process.env.NODE_ENV === 'production') {
    // 비 로그인
    if (!token) {
      const nouserProtected =
        PROTECT.NO_USER.some((path) => pathname.startsWith(path)) &&
        !pathname.includes('sign-in') &&
        !pathname.includes('sign-up');

      if (nouserProtected) {
        const loginUrl = new URL('/select-role' + authQuery, url);
        return NextResponse.redirect(loginUrl);
      }
      return res;
    }

    // 로그인
    if (token) {
      const decode = jwtDecode(token) as CustomJWTPayload;
      const referer = request.headers.get('referer');

      if (!decode) return res;

      const { roleId, type } = decode;

      //프로필 미등록 유저 블럭
      if (!roleId && !pathname.includes('/profile/register')) {
        const referer = request.headers.get('referer');
        const urlPath = `/${type === 'customer' ? 'user' : 'mover'}/profile/register`;

        if (!referer) return NextResponse.redirect(new URL(urlPath, url));

        if (referer.includes('/profile/register'))
          return NextResponse.redirect(
            new URL(urlPath + '?warn=profileRegister', url),
          );

        return NextResponse.redirect(new URL(urlPath, url));
      }

      // 프로필 등록 유저 블럭
      if (roleId && pathname.includes('/profile/register')) {
        if (type === 'customer') {
          return NextResponse.redirect(
            new URL('/user/quotes/request' + noAccess, url),
          );
        } else {
          return NextResponse.redirect(
            new URL('/mover/quotes/requested' + noAccess, url),
          );
        }
      }

      const protectType =
        type === 'customer' ? PROTECT.CUSTOMER : PROTECT.MOVER;
      const authUserProtected = protectType.some((path) =>
        pathname.includes(path),
      );

      if (
        pathname.includes('sign-in') ||
        pathname.includes('sign-up') ||
        pathname.includes('select-role')
      ) {
        return NextResponse.redirect(new URL('/' + noAccess, url));
      }

      if (authUserProtected) {
        if (referer) {
          return NextResponse.redirect(new URL(referer + noAccess, url));
        } else {
          return NextResponse.redirect(new URL('/' + noAccess, url));
        }
      }
    }

    return res;
  }
}

interface CustomJWTPayload {
  userId: string;
  type: UserType;
  roleId: string;
  iat: number;
  exp: number;
}
