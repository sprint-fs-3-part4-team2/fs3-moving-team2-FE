import crypto from 'crypto';
import axios from 'axios';
import { cookies } from 'next/headers';

export const createServerAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const cookieStore = cookies();
    const allCookies = cookieStore.toString();

    const csrfToken = crypto.randomBytes(32).toString('hex');

    const cleanedCookies = allCookies
      .split(';')
      .map((cookie) => cookie.trim())
      .filter((cookie) => !cookie.startsWith('csrfToken='))
      .join('; ');

    const cookieWithCsrf = cleanedCookies
      ? `${cleanedCookies}; csrfToken=${csrfToken}`
      : `csrfToken=${csrfToken}`;

    config.headers['Cookie'] = cookieWithCsrf;
    config.headers['X-CSRF-Token'] = csrfToken;

    return config;
  });

  return instance;
};
