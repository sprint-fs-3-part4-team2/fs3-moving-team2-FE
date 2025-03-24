import axiosInstance from '@/lib/axiosInstance';
import { QuoteRequest } from './types/quotesDetail/common.types';

// 견적 요청 생성
export const createQuoteRequest = async ({
  moveType,
  moveDate,
  departure,
  arrival,
}: QuoteRequest) => {
  try {
    await axiosInstance.post<QuoteRequest>(`/quote-requests`, {
      moveType,
      moveDate,
      departure,
      arrival,
    });
  } catch (error: any) {
    console.error('견적 요청 실패', error);
  }
};
