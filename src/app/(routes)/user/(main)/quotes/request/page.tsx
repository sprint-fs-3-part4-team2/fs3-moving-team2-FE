import QuoteRequestPage from '@/components/quoteRequest/QuoteRequestPage';
import QuoteRequestInProgressPage from '@/components/quoteRequest/QuoteRequestInProgressPage';

async function getlatestQuoteRequest() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quote-requests/latest`,
    { cache: 'no-store' },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch getlatestQuoteRequest');
  }
  return response.json();
}

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
