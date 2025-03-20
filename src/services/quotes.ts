import axiosInstance from '@/lib/axiosInstance';
import {
  QuoteForCustomer,
  QuoteForMover,
} from './types/quotesDetail/quotesDetail.types';
import { QuoteRequest } from './types/quotesDetail/common.types';
import { SubmittedQuotes } from './types/submittedQuotes/submittedQuotes.types';

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
    const { data } = await axiosInstance.get<QuoteForMover>(
      `/quotes/${quoteId}/mover`,
    );
    return data;
  } catch {
    console.error('견적 불러오기 실패');
  }
};

export const getSubmittedQuotesList = async ({
  page = 1,
  pageSize = 4,
  moverId,
}: {
  page: number;
  pageSize: number;
  moverId: string;
}) => {
  try {
    const { data } = await axiosInstance.get<SubmittedQuotes>(
      `/quotes/${moverId}/submitted`,
      {
        params: {
          page,
          pageSize,
        },
      },
    );
    return data;
  } catch {
    console.error('완료된 견적 목록 불러오기 실패');
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
