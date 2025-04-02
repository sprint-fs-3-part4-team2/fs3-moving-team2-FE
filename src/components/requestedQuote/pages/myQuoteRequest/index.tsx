'use client';

import { useQuery } from '@tanstack/react-query';
import QuoteRequestExist from '../../templates/quoteRequestExist';
import NoQuoteRequest from '../../templates/noQuoteRequest';
import { getQuoteRequest } from '@/services/quoteRequests';

export default function MyQuoteRequest() {
  const { data } = useQuery({
    queryKey: ['myQuoteRequest'],
    queryFn: getQuoteRequest,
  });

  if (data && data?.isRequested && data?.quote)
    return (
      <QuoteRequestExist
        id={data.quote.id}
        movingDate={new Date(data.quote.moveDate)}
        requestedDate={new Date(data.quote.requestedAt)}
        movingType={data.quote.moveType}
        departure={data.quote.departure.fullAddress}
        arrival={data.quote.arrival.fullAddress}
      />
    );
  return <NoQuoteRequest />;
}
