import axiosInstance from '@/lib/axiosInstance';
import { MOVING_TYPES } from '@/constants/movingTypes';

export type MovingTypeKey = keyof typeof MOVING_TYPES;

export interface Mover {
  id: number;
  variant: string;
  subVariant: string;
  moverName: string;
  imageUrl: string;
  movingType: MovingTypeKey[];
  isCustomQuote: boolean;
  rating?: number;
  ratingCount: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite?: boolean;
  favoriteCount?: number;
  isFavoriteMoverList?: boolean;
  description?: string;
}

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return false;
    }

    // 사용자 정보 조회로 인증 상태 확인
    const response = await axiosInstance.get('users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return false;
  }
};

export const searchMovers = async (searchTerm: string) => {
  try {
    const isAuth = await checkAuth();
    const headers = isAuth
      ? {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      : {};

    const { data } = await axiosInstance.get('/movers/search', {
      headers,
      params: { keyword: searchTerm },
    });

    return data.data || data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};

export const getMovers = async (params: {
  sortBy: string;
  area?: string;
  service?: string;
}) => {
  try {
    const isAuth = await checkAuth();
    const headers = isAuth
      ? {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      : {};

    const { data } = await axiosInstance.get('/movers', {
      headers,
      params,
    });

    return data.data || data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    throw error;
  }
};
