import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { UserType } from './components/authPage/common.types';

const PASSPORT = 'passPortToken';
const protectedPathsMover = ['/mover/info/edit'];

interface CustomJWT {
  userId: string;
  type: UserType;
  roleId: string;
  iat: number;
  exp: number;
}

// 미들웨어 함수 정의
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;
  const { cookies, url } = request;
  const token = cookies.get('accessToken')?.value;

  // if (token) {
  //   const decoded = jwtDecode(token) as CustomJWT;
  //   const p2 = cookies.get(PASSPORT);

  //   if (decoded)
  //     res.cookies.set({
  //       name: PASSPORT,
  //       value: JSON.stringify({ type: decoded.type }),
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       path: '/',
  //       sameSite: 'none',
  //     });
  // } else res.cookies.delete(PASSPORT);

  if (protectedPathsMover.some((path) => pathname.startsWith(path))) {
    if (!token) {
      const loginUrl = new URL('/mover/sign-in', url);
      return NextResponse.redirect(loginUrl);
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
