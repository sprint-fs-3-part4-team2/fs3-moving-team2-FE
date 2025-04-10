import axiosInstance from '@/lib/axiosInstance';
import * as userQuotes from '@/services/types/userQuotes/userQuotes';

export const fetchFavorites = async (): Promise<string[]> => {
  const response = await axiosInstance.get('/favorites');
  if (Array.isArray(response.data.data)) {
    return response.data.data.map((fav: { moverId: string }) => fav.moverId);
  }
  return [];
};

export const fetchCustomerQuotes = async (): Promise<userQuotes.Quote[]> => {
  const response = await axiosInstance.get('/quote/pending-quotes');
  return response.data.data;
};
