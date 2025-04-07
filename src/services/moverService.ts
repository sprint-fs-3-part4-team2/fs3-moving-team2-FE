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
