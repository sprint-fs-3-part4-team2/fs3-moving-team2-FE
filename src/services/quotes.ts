import axiosInstance from '@/lib/axiosInstance';
import { QuoteForCustomer } from './types/quotesForCustomer.types';

export const getQuoteByCustomer = async (quoteId: string) => {
  try {
    const { data } = await axiosInstance.get<QuoteForCustomer>(
      `/quotes/${quoteId}`,
    );
    return data;
  } catch {
    console.error('견적 불러오기 실패');
  }
};
