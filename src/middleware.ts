import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { PROTECT } from './middleware/constants';
import { jwtDecode } from 'jwt-decode';
import { CustomJWT } from './middleware/constants';

const PROTECT = {
  NO_USER: ['/mover', '/user'], // 로그인 안했을 때
  CUSTOMER: ['/mover'], // 고객이 권한 없는 페이지
  MOVER: ['/user'], // 기사가 권한 없는 페이지
};

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;
  const { cookies, url } = request;
  const token = cookies.get('accessToken')?.value;

  if (!token) {
    const nouserProtected =
      PROTECT.NO_USER.some((path) => pathname.startsWith(path)) &&
      !pathname.includes('sign-in');

    if (nouserProtected) {
      const loginUrl = new URL('/mover/sign-in', url);
      return NextResponse.redirect(loginUrl);
    }
    return res;
  }

  if (token) {
    const decode = jwtDecode(token) as CustomJWT;
    if (!decode) return res;

    const protectType =
      decode.type === 'customer' ? PROTECT.CUSTOMER : PROTECT.MOVER;
    const authUserProtected =
      protectType.some((path) => pathname.includes(path)) ||
      pathname.includes('sign-in') ||
      pathname.includes('sign-up');

    if (authUserProtected) {
      const referer = request.headers.get('referer');
      if (referer) {
        return NextResponse.redirect(referer);
      } else {
        return NextResponse.redirect(new URL('/', url));
      }
    }
  }
  return res;
}

// 미들웨어 적용할 경로 설정 (matcher 사용)
// export const config = {
//   matcher: [
//     '/mover/:path*',
//     '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
//   ],
// };
