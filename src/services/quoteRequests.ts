import axiosInstance from '@/lib/axiosInstance';
import { QuoteRequest } from './types/quotesDetail/common.types';
import { QuoteRequestResponse } from './types/quotesDetail/quoteRequests.types';
import { QuoteRequestsResponse } from './types/allQuotes/allQuoteRequests.types';

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

export const getlatestQuoteRequest = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  const response = await fetch(`${baseUrl}/quote-requests/latest`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch getlatestQuoteRequest');
  }
  return response.json();
};

export const cancelQuoteRequest = async (quoteRequestId: string) => {
  try {
    await axiosInstance.delete(`/quote-requests/${quoteRequestId}`);
  } catch (error: any) {
    console.error('견적 요청 취소 실패', error);
    throw error;
  }
};

export const getAllQuoteRequests = async (
  page?: number,
  pageSize?: number,
  search?: string,
  moveType?: string,
  sortBy?: string,
  isServiceRegionMatch?: boolean,
  isTargetedQuote?: boolean,
) => {
  try {
    const { data } = await axiosInstance.get<QuoteRequestsResponse>(
      '/quote-requests',
      {
        params: {
          page: page || 1,
          pageSize: pageSize || 10,
          search: search ? search : undefined,
          moveType: moveType ? moveType : undefined,
          sortBy: sortBy ? sortBy : undefined,
          isServiceRegionMatch: isServiceRegionMatch
            ? isServiceRegionMatch
            : undefined,
          isTargetedQuote: isTargetedQuote ? isTargetedQuote : undefined,
        },
      },
    );
    return data;
  } catch (error: any) {
    console.error('모든 견적 요청 조회 실패', error);
    throw error;
  }
};
