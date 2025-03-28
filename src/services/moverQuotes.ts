import axiosInstance from '@/lib/axiosInstance';
import {
  QuoteForCustomer,
  QuoteForMover,
} from './types/quotesDetail/quotesDetail.types';
import { QuoteRequest } from './types/quotesDetail/common.types';
import {
  SubmitQuoteRequest,
  SubmittedQuotes,
} from './types/submittedQuotes/submittedQuotes.types';

const MOVER_QUOTE_URL = '/mover-quotes';

export const getQuoteByCustomer = async (quoteId: string) => {
  try {
    const { data } = await axiosInstance.get<QuoteForCustomer>(
      `${MOVER_QUOTE_URL}/${quoteId}/customer`,
    );
    return data;
  } catch {
    console.error('견적 불러오기 실패');
  }
};

export const getQuoteByMover = async (quoteId: string) => {
  try {
    const { data } = await axiosInstance.get<QuoteForMover>(
      `${MOVER_QUOTE_URL}${quoteId}/mover`,
    );
    return data;
  } catch {
    console.error('견적 불러오기 실패');
  }
};

export const getSubmittedQuotesList = async ({
  page = 1,
  pageSize = 6,
}: {
  page: number;
  pageSize: number;
}) => {
  try {
    const { data } = await axiosInstance.get<SubmittedQuotes>(
      `${MOVER_QUOTE_URL}/submitted`,
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

export const submitQuoteByMover = async (
  quoteId: string,
  price: number,
  comment: string,
) => {
  try {
    await axiosInstance.post<SubmitQuoteRequest>(
      `${MOVER_QUOTE_URL}/submit/${quoteId}`,
      {
        price,
        comment,
      },
    );
  } catch {
    console.error('견적 제출 실패');
  }
};
