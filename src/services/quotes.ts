import axiosInstance from '@/lib/axiosInstance';
import {
  QuoteForCustomer,
  QuoteFormMover,
} from './types/quotesDetail/quotesDetail.types';
import { QuoteRequest } from './types/quotesDetail/common.types';

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

export const createQuoteRequest = async ({
  moveType,
  moveDate,
  departure,
  arrival,
}: QuoteRequest) => {
  try {
    await axiosInstance.post<QuoteRequest>(`/quotes/request`, {
      moveType,
      moveDate,
      departure,
      arrival,
    });
  } catch (error: any) {
    console.error('견적 요청 실패', error);
  }
};
