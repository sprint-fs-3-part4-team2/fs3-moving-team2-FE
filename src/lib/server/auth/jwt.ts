import { JWTPayload, jwtVerify } from 'jose';

// 클라이언트 코드에서 import 절대 금지
export const verifyToken = async <T extends JWTPayload>(
  token: string,
): Promise<{ payload: T } | null> => {
  try {
    if (!token || token.trim() === '') {
      return null;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decodedToken = await jwtVerify<T>(
      token,
      new TextEncoder().encode(secret),
    );
    return { payload: decodedToken.payload };
  } catch (error) {
    console.error('[ERROR] Token verification failed:', error);
    return null;
  }
};

export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      credentials: 'include',
    },
  );
  return response;
};
