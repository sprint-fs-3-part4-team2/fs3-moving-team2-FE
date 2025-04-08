import { getQuoteByCustomer } from '@/services/moverQuotes';
import { QuoteForCustomer } from '@/services/types/quotesDetail/quotesDetail.types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useToaster } from './useToaster';
import { useRouter } from 'next/navigation';

export const useQuoteDetailByCustomerQuery = (id: string) => {
  const toast = useToaster();
  const router = useRouter();
  const quoteDetail = useQuery<
    QuoteForCustomer,
    AxiosError<{ message: string }>
  >({
    queryKey: ['quotes', 'customer', id],
    queryFn: async () => getQuoteByCustomer(id),
    retry: false,
  });
  const { error } = quoteDetail;

  useEffect(() => {
    if (error && error.status === 403) {
      toast('warn', error.response?.data?.message ?? '');
      setTimeout(() => router.push('/user/quotes/pending'), 1000);
    }
  }, [error]);

  return quoteDetail;
};
