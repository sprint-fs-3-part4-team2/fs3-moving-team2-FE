import axiosInstance from '@/lib/axiosInstance';
import {
  QuoteForCustomer,
  QuoteFormMover,
} from './types/quotesDetail/quotesDetail.types';

export const getQuoteByCustomer = async (quoteId: string) => {
  try {
    const { data } = await axiosInstance.get<QuoteForCustomer>(
      `/quotes/${quoteId}/customer`,
    );
    return data;
  } catch {
    console.error('견적 불러오기 실패');
  }
};

export const getQuoteByMover = async (quoteId: string) => {
  try {
    const { data } = await axiosInstance.get<QuoteFormMover>(
      `/quotes/${quoteId}/mover`,
    );
    return data;
  } catch {
    console.error('견적 불러오기 실패');
  }
};
