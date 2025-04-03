'use client';
import QuoteRequestPage from '@/components/quoteRequest/QuoteRequestPage';
import QuoteRequestInProgressPage from '@/components/quoteRequest/QuoteRequestInProgressPage';
import { getQuoteRequest } from '@/services/quoteRequests';
import { useQuery } from '@tanstack/react-query';

export default async function Page() {
  const { data } = useQuery({
    queryKey: ['myQuoteRequest'],
    queryFn: getQuoteRequest,
  });

  return data?.isRequested ? (
    <QuoteRequestInProgressPage />
  ) : (
    <QuoteRequestPage />
  );
}
