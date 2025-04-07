import axiosInstance from '@/lib/axiosInstance';
import { MOVING_TYPES, MOVING_STATE } from '@/constants/movingTypes';

export type MovingTypeKey = keyof typeof MOVING_TYPES;
export type MovingStateKey = keyof typeof MOVING_STATE;

export interface Mover {
  id: number;
  variant: string;
  subVariant: string;
  moverName: string;
  imageUrl: string;
  movingType: MovingTypeKey[];
  isCustomQuote: boolean;
  quoteState?: MovingStateKey[];
  rating?: number;
  ratingCount: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite?: boolean;
  favoriteCount?: number;
  isFavoriteMoverList?: boolean;
  description?: string;
}

export interface MoverDetail extends Mover {
  introduction: string;
  regions: string[];
}

export const searchMovers = async (searchTerm: string) => {
  try {
    const { data } = await axiosInstance.get('/movers/search', {
      params: {
        keyword: searchTerm,
        searchFields: ['moverName', 'description'],
      },
    });

    return data.data || data;
  } catch (error: any) {
    throw error;
  }
};

export const getMovers = async (params: {
  sortBy: string;
  area?: string;
  service?: string;
  isFavorite?: boolean;
}) => {
  try {
    const { data } = await axiosInstance.get('/movers', {
      params,
    });

    console.log('API Response:', data);
    return data.data || data;
  } catch (error: any) {
    throw error;
  }
};

export const getMoverDetail = async (moverId: string) => {
  try {
    const response = await axiosInstance.get(`/movers/${moverId}`);
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const checkFavoriteStatus = async (moverId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const response = await axiosInstance.get(`/favorites/check/${moverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const toggleFavorite = async (moverId: string, isFavorite: boolean) => {
  try {
    const token = localStorage.getItem('accessToken');
    const endpoint = isFavorite
      ? `/favorites/delete/${moverId}`
      : `/favorites/create/${moverId}`;

    const response = await axiosInstance[isFavorite ? 'delete' : 'post'](
      endpoint,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const checkGeneralQuote = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const response = await axiosInstance.get('/quote-requests/latest', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
