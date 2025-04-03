import axiosInstance from '@/lib/axiosInstance';
import {
  QuoteForCustomer,
  QuoteForMover,
} from './types/quotesDetail/quotesDetail.types';
import {
  SubmitQuoteRequest,
  SubmittedQuotes,
} from './types/submittedQuotes/submittedQuotes.types';
import { AxiosResponse } from 'axios';

const MOVER_QUOTE_URL = '/mover-quotes';

export const getQuoteByCustomer = async (quoteId: string) => {
  try {
    const { data } = await axiosInstance.get<QuoteForCustomer>(
      `${MOVER_QUOTE_URL}/${quoteId}/customer`,
    );
    return data;
  } catch (error) {
    console.error('견적 불러오기 실패', error);
    throw error;
  }
};

export const getQuoteByMover = async (quoteId: string) => {
  try {
    const { data } = await axiosInstance.get<QuoteForMover>(
      `${MOVER_QUOTE_URL}${quoteId}/mover`,
    );
    return data;
  } catch (error) {
    console.error('견적 불러오기 실패', error);
    throw error;
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
  } catch (error) {
    console.error('완료된 견적 목록 불러오기 실패', error);
    throw error;
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

export const confirmQuoteByCustomer = async (moverQuoteId: string) => {
  try {
    await axiosInstance.post<void, AxiosResponse<void>, string>(
      `/quote/confirm-quote/${moverQuoteId}`,
    );
  } catch (error) {
    console.error('견적 확정 실패', error);
    throw error;
  }
};
