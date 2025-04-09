import axiosInstance from '@/lib/axiosInstance';
import * as quotesList from '@/services/types/quotesList/quotesList';

export const fetchFavorites = async (): Promise<string[]> => {
  const response = await axiosInstance.get('/favorites');
  if (Array.isArray(response.data.data)) {
    return response.data.data.map((fav: { moverId: string }) => fav.moverId);
  }
  return [];
};

export const fetchCustomerQuotes = async (): Promise<quotesList.Quote[]> => {
  const response = await axiosInstance.get('/quotes/quote-customer-requests');
  return response.data.data;
};
