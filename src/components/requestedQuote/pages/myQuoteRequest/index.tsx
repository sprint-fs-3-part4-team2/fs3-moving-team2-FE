'use client';

import { useQuery } from '@tanstack/react-query';
import QuoteRequestExist from '../../templates/quoteRequestExist';
import NoQuoteRequest from '../../templates/noQuoteRequest';
import { getQuoteRequest } from '@/services/quoteRequests';
import Loading from '@/app/loading';

export default function MyQuoteRequest() {
  const { data, isLoading } = useQuery({
    queryKey: ['myQuoteRequest'],
    queryFn: getQuoteRequest,
  });

  if (isLoading) return <Loading />;

  if (data && data?.isRequested && data?.quote)
    return (
      <QuoteRequestExist
        id={data.quote.id}
        movingDate={new Date(data.quote.moveDate)}
        requestedDate={new Date(data.quote.requestedDate)}
        movingType={data.quote.moveType}
        departure={data.quote.departure.fullAddress}
        arrival={data.quote.arrival.fullAddress}
        status={data.quote.status}
      />
    );
  return <NoQuoteRequest />;
}
