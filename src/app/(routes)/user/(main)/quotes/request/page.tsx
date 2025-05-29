'use client';
import QuoteRequestPage from '@/components/quoteRequest/QuoteRequestPage';
import QuoteRequestSummaryPage from '@/components/quoteRequest/QuoteRequestSummaryPage';
import { getQuoteRequest } from '@/services/quoteRequests';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';

export default function Page() {
  const { data, isLoading, isError } = useQuery({
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

  if (isError) {
    return (
      <div className='flex justify-center items-center w-full h-screen'>
        <p className='text-red-500'>
          견적 요청 정보를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return data?.isRequested ? (
    <QuoteRequestSummaryPage data={data} /> // 요약 페이지
  ) : (
    <QuoteRequestPage />
  );
}
