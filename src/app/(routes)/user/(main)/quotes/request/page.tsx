'use client';
import QuoteRequestPage from '@/components/quoteRequest/QuoteRequestPage';
import QuoteRequestSummaryPage from '@/components/quoteRequest/QuoteRequestSummaryPage';
import useMyQuoteRequest from '@/hooks/useMyQuoteRequest';

export default function Page() {
  const { ui, data } = useMyQuoteRequest();
  if (ui) return ui; // 로딩 또는 에러 UI를 ui로부터 받는다

  return data?.isRequested ? (
    <QuoteRequestSummaryPage data={data} />
  ) : (
    <QuoteRequestPage />
  );
}
