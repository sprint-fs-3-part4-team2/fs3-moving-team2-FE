import { getCSRFTokenFromCookie } from '@/utils/getCSRFTokenFromCookie';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  withCredentials: true,
});

type RefreshTokenCallback = (error?: any) => void;

let isRefreshing = false;
let refreshSubscribers: RefreshTokenCallback[] = [];
let refreshAttempted = false;
const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};
const onRefreshError = (error: Error) => {
  refreshSubscribers.forEach((callback) => callback(error));
  refreshSubscribers = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let csrfToken = getCSRFTokenFromCookie();
    if (!csrfToken) {
      await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'include',
      });
      csrfToken = getCSRFTokenFromCookie();
    }
    if (csrfToken) config.headers['X-CSRF-Token'] = csrfToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    if (
      response.config.url === '/users/me' &&
      response.data === null &&
      !refreshAttempted
    ) {
      refreshAttempted = true;

      try {
        const refreshResponse = await axiosInstance.post(
          'auth/refresh-token',
          {},
          { withCredentials: true },
        );
        if (refreshResponse.status === 200) {
          const originalRequest = response.config;
          refreshAttempted = false;
          return axiosInstance(originalRequest);
        }
        return response;
      } catch (error) {
        console.error('토큰 리프레쉬 실패', error);
        refreshAttempted = false;
        return response;
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const skipRefreshUrls = [
      'auth/sign-in/customer',
      'auth/sign-in/mover',
      'auth/sign-up/customer',
      'auth/sign-up/mover',
    ];
    if (skipRefreshUrls.includes(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (originalRequest.url === 'auth/refresh-token') {
      return;
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((error: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(axiosInstance(originalRequest));
            }
          });
        });
      }

      isRefreshing = true;

      try {
        await axiosInstance.post(
          'auth/refresh-token',
          {},
          {
            withCredentials: true,
          },
        );

        onRefreshed();
        isRefreshing = false;

        return axiosInstance(originalRequest);
      } catch (error: any) {
        onRefreshError(error);
        isRefreshing = false;
        return Promise.reject(error);
      }
    }

    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error('리소스를 찾을 수 없습니다');
          break;
        case 500:
          console.error('서버 에러');
          break;
        default:
          console.error('API 요청 중 에러 발생:', error);
      }
    } else if (error.request) {
      console.error('네트워크 에러');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
