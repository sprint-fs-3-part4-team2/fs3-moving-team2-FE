import MyQuoteRequest from '@/components/requestedQuote/pages/myQuoteRequest';
import { getQuoteRequest } from '@/services/serverSide/quoteRequests';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['myQuoteRequest'],
    queryFn: getQuoteRequest,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyQuoteRequest />
    </HydrationBoundary>
  );
}
