import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  const token = crypto.randomBytes(64).toString('hex');

  const response = NextResponse.json({ message: 'CSRF Token 생성 완료' });

  response.cookies.set('csrfToken', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 5,
    path: '/',
  });

  return response;
}
