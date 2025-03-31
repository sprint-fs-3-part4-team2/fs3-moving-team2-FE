export const dynamic = 'force-dynamic';

import QuoteRequestPage from '@/components/quoteRequest/QuoteRequestPage';
import QuoteRequestInProgressPage from '@/components/quoteRequest/QuoteRequestInProgressPage';
import { getlatestQuoteRequest } from '@/services/quoteRequests';

export default async function Page() {
  let data = null;
  try {
    data = await getlatestQuoteRequest();
  } catch (error) {
    console.error('Error fetching : getlatestQuoteRequest', error);
  }

  console.log('data : ', data);

  return data.isRequested ? (
    <QuoteRequestInProgressPage />
  ) : (
    <QuoteRequestPage />
  );
}
