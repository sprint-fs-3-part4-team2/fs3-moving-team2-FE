import React, { ReactNode } from 'react';
import { getQuoteRequest } from '@/services/quoteRequests';
import { useQuery } from '@tanstack/react-query';
import { QuoteRequestSkeleton } from '@/components/quoteRequest/QuoteRequestSkeleton';
import { QuoteRequestError } from '@/components/quoteRequest/QuoteRequestError';
import { QuoteRequestResponse } from '@/services/types/quotesDetail/quoteRequests.types';

interface UseMyQuoteRequestResult {
  ui: ReactNode | null;
  data?: QuoteRequestResponse;
  refetch: () => void;
}

export default function useMyQuoteRequest(): UseMyQuoteRequestResult {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['myQuoteRequest'],
    queryFn: getQuoteRequest,
  });

  if (isLoading) {
    return { ui: (<QuoteRequestSkeleton />) as ReactNode, refetch };
  }
  if (isError) {
    return {
      ui: (
        <QuoteRequestError
          onRetry={() => refetch()}
          error={error}
        />
      ) as ReactNode,
      refetch,
    };
  }

  return {
    ui: null as ReactNode,
    data,
    refetch,
  };
}
