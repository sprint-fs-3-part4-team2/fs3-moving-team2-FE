import { COOKIE_OPTIONS, VISITOR_ALLOWED_PATHS } from './constants';
import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { refreshToken } from './jwt';
import { CustomJWTPayload } from './types';

export const handleTokenRefresh = async (reToken: string) => {
  const refreshTokenResponse = await refreshToken(reToken);

  if (!refreshTokenResponse.ok) {
    throw new Error('Token refresh failed');
  }

  const refreshedCookies = refreshTokenResponse.headers.get('Set-Cookie');

  if (!refreshedCookies) {
    throw new Error('No cookies returned from refresh');
  }

  const response = NextResponse.next();
  const cookieArray = refreshedCookies
    .split(',')
    .map((cookie) => cookie.trim());

  let refreshedToken: CustomJWTPayload | null = null;

  for (const cookie of cookieArray) {
    const tokenMatch = cookie.match(/accessToken=([^;]+)/);
    if (tokenMatch && tokenMatch[1]) {
      refreshedToken = jwtDecode(tokenMatch[1]) as CustomJWTPayload;
      response.cookies.set('accessToken', tokenMatch[1], COOKIE_OPTIONS);
      break;
    }
  }

  return { response, refreshedToken };
};

export const isVisitorAllowedPath = (pathname: string) => {
  return VISITOR_ALLOWED_PATHS.some(
    (path) => pathname.startsWith(path) || pathname === '/',
  );
};
