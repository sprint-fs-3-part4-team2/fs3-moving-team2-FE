import axiosInstance from '@/lib/axiosInstance';
import { QuoteRequest } from './types/quotesDetail/common.types';
import { QuoteRequestResponse } from './types/quotesDetail/quoteRequests.types';

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
    throw error;
  }
};

export const getQuoteRequest = async () => {
  try {
    const { data } = await axiosInstance.get<QuoteRequestResponse>(
      `/quote-requests/latest`,
    );
    return data;
  } catch (error: any) {
    console.error('견적 요청 조회 실패', error);
    throw error;
  }
};

export const cancelQuoteRequest = async (requestId: string) => {
  try {
    await axiosInstance.delete('/quote-request');
  } catch (error: any) {
    console.error('견적 요청 취소 실패', error);
    throw error;
  }
};
