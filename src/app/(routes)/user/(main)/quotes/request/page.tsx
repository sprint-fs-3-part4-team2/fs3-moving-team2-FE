export const dynamic = 'force-dynamic';

import QuoteRequestPage from '@/components/quoteRequest/QuoteRequestPage';
import QuoteRequestInProgressPage from '@/components/quoteRequest/QuoteRequestInProgressPage';
import { getlatestQuoteRequest } from '@/services/quoteRequests';

export default async function Page() {
  let data = null;
  try {
    data = await getlatestQuoteRequest();
    console.log('getlatestQuoteRequest', data);
  } catch (error) {
    console.error('Error fetching : getlatestQuoteRequest', error);
    return (
      <div>데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</div>
    );
  }

  return data.isRequested ? (
    <QuoteRequestInProgressPage />
  ) : (
    <QuoteRequestPage />
  );
}
