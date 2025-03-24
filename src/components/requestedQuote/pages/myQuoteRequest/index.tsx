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

  //   return (
  //     <QuoteRequestExist
  //       id={'abc'}
  //       movingDate={new Date()}
  //       requestedDate={new Date()}
  //       movingType={'소형이사'}
  //       departure={'경기도 김포'}
  //       arrival={'서울 중구'}
  //     />
  //   );

  if (data && data?.isRequested && data?.quote)
    return (
      <QuoteRequestExist
        id={data.quote.id}
        movingDate={new Date(data.quote.moveDate)}
        requestedDate={new Date(data.quote.moveDate)}
        movingType={data.quote.moveType}
        departure={data.quote.departure}
        arrival={data.quote.arrival}
      />
    );
  return <NoQuoteRequest />;
}
