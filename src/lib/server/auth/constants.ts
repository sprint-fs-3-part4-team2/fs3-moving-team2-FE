export const VISITOR_ALLOWED_PATHS = ['/user/movers'];

export const AUTH_PATHS = [
  '/select-role',
  '/user/sign-in',
  '/user/sign-up',
  '/mover/sign-in',
  '/mover/sign-up',
];

export const PROTECT = {
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

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 1000 * 60 * 5,
  path: '/',
  domain: process.env.COOKIE_DOMAIN,
} as const;
