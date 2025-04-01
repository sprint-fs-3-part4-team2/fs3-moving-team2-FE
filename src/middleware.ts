import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPathsMover = ['/mover/info/edit'];
// 미들웨어 함수 정의
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;
  const { cookies, url } = request;
  const token = cookies.get('accessToken')?.value;
  if (token)
    res.cookies.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'none',
    });
  else res.cookies.delete('authToken');

  if (protectedPathsMover.some((path) => pathname.startsWith(path))) {
    // const token = cookies.get('authToken')?.value;
    console.log('token', token);
    // mover auth
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
