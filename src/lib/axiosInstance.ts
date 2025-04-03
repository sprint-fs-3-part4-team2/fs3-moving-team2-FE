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

type RefreshTokenCallback = (token: string | null, error?: any) => void;

let isRefreshing = false;
let refreshSubscribers: RefreshTokenCallback[] = [];
let refreshAttempted = false;
const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};
const onRefreshError = (error: Error) => {
  refreshSubscribers.forEach((callback) => callback(null, error));
  refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
  async (response) => {
    if (
      response.config.url === 'users/me' &&
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

    if (originalRequest.url === 'auth/refresh-token') {
      return;
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((token: string | null, error: any) => {
            if (error) {
              reject(error);
            } else {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axiosInstance.post(
          'auth/refresh-token',
          {},
          {
            withCredentials: true,
          },
        );

        const newToken = response.data.accessToken;
        onRefreshed(newToken);
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
