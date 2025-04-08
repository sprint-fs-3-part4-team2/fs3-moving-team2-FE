'use client';
import QuoteRequestPage from '@/components/quoteRequest/QuoteRequestPage';
import QuoteRequestSummaryPage from '@/components/quoteRequest/QuoteRequestSummaryPage';
import { getQuoteRequest } from '@/services/quoteRequests';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ['myQuoteRequest'],
    queryFn: getQuoteRequest,
  });

  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-full h-screen'>
        <Loading />
      </div>
    );
  }

  return data?.isRequested ? (
    <QuoteRequestSummaryPage /> // 요약 페이지
  ) : (
    <QuoteRequestPage />
  );
}
