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
  const { pathname, searchParams } = request.nextUrl;
  const { cookies, url, headers } = request;
  const token = cookies.get('accessToken')?.value;
  const reToken = cookies.get('refreshToken')?.value;
  const requestHeaders = new Headers(headers);
  const referer = request.headers.get('referer');

  const res = NextResponse.next();

  const authQuery = '?warn=login';
  const noAccess = '?warn=noAccess';

  if (!process.env.NEXT_PUBLIC_SSR) {
    console.error('🚨 [ERROR] SSR 환경 설정 필요');
    // return res; // env 처리 전까지 주석
  }

  // dev 환경에선 미들웨어 막기
  // 미들웨어 사용안하실거면 여기 주석처리 해주세요
  // if (process.env.NODE_ENV === 'development') return res;

  // 비 로그인
  if (!token && !reToken) {
    requestHeaders.delete(process.env.NEXT_PUBLIC_SSR || 'ssr-token');
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

  // 토큰 만료 시 엑세스 토큰 재발급 할 때 이동
  if (reToken && !token) {
    if (!token) {
      if (referer)
        setTimeout(() => {
          return NextResponse.redirect(new URL(referer, url));
        }, 1000);
      else
        setTimeout(() => {
          return NextResponse.redirect(new URL('/', url));
        }, 1000);
    }
  }

  // 로그인
  if (token) {
    const decode = jwtDecode(token) as CustomJWTPayload;
    const ssrToken = request.headers.get(
      process.env.NEXT_PUBLIC_SSR || 'ssr-token',
    );
    if (!decode) return res;

    const { roleId, type } = decode;
    //ssr 용 token
    if (roleId && !ssrToken)
      requestHeaders.set(
        process.env.NEXT_PUBLIC_SSR || 'ssr-token',
        'accessToken=' + token,
      );

    //프로필 미등록 유저 블럭
    if (
      !roleId &&
      !pathname.includes('/profile/register') &&
      !searchParams.has('register')
    ) {
      const referer = request.headers.get('referer');
      const urlPath = `/${type === 'customer' ? 'user' : 'mover'}/profile/register`;
      if (!referer) return NextResponse.redirect(new URL(urlPath, url));

      if (referer.includes('/profile/register'))
        return NextResponse.redirect(
          new URL(urlPath + '?warn=profileRegister', url),
        );

      return NextResponse.redirect(new URL(urlPath + '?register', url));
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

    const protectType = type === 'customer' ? PROTECT.CUSTOMER : PROTECT.MOVER;
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

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

interface CustomJWTPayload {
  userId: string;
  type: UserType;
  roleId: string;
  iat: number;
  exp: number;
}
