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
  handleTokenRefresh,
  isVisitorAllowedPath,
} from './lib/server/auth/utils';
import { PROTECT } from './lib/server/auth/constants';
import { CustomJWTPayload } from './lib/server/auth/types';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const visitorAllowed = isVisitorAllowedPath(pathname);
  if (visitorAllowed) return NextResponse.next();

  const token = request.cookies.get('accessToken')?.value;
  const reToken = request.cookies.get('refreshToken')?.value;
  const verifiedAccessToken = token
    ? await verifyToken<CustomJWTPayload>(token)
    : null;

  if (!verifiedAccessToken && !reToken) {
    return NextResponse.redirect(
      new URL('/select-role?warn=login', request.url),
    );
  }

  let currentUserData: CustomJWTPayload | null = null;
  let response = NextResponse.next();

  // 토큰 리프레쉬
  if (!verifiedAccessToken && reToken) {
    try {
      const refreshResult = await handleTokenRefresh(reToken);
      response = refreshResult.response;
      currentUserData = refreshResult.refreshedToken;
      if (!currentUserData) {
        return NextResponse.redirect(
          new URL('/select-role?warn=login', request.url),
        );
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      return NextResponse.redirect(
        new URL('/select-role?warn=login', request.url),
      );
    }
  } else if (verifiedAccessToken) {
    currentUserData = verifiedAccessToken.payload;
  }

  const roleId = currentUserData?.roleId;
  const type = currentUserData?.type;

  if (!roleId) {
    const urlPath = `/${type === 'customer' ? 'user' : 'mover'}/profile/register`;
    return NextResponse.redirect(new URL(urlPath, request.url));
  }

  const protectType = type === 'customer' ? PROTECT.CUSTOMER : PROTECT.MOVER;
  const authUserProtected = protectType.some((path) => pathname.includes(path));

  if (authUserProtected) {
    return NextResponse.redirect(new URL('/?warn=noAccess', request.url));
  }

  return response;
}
