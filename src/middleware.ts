import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPathsMover = ['/mover/info/edit'];
// 미들웨어 함수 정의
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedPathsMover.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get('accessToken')?.value;

    // mover auth
    if (!token) {
      const loginUrl = new URL('/mover/sign-in', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 미들웨어 적용할 경로 설정 (matcher 사용)
// export const config = {
//   matcher: [
//     '/mover/:path*',
//     '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
//   ],
// };
