'use client';

import CustomerInfo from '@/components/common/customerInfo/templates/customerInfo';
import { getSubmittedQuotesList } from '@/services/quotes';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || 4);
  const moverId = 'cm8cvdyaf006lt47dywv5gugh';

  const { data } = useQuery({
    queryKey: ['quotes', page, pageSize],
    queryFn: async () => getSubmittedQuotesList({ page, pageSize, moverId }),
  });

  return (
    data && (
      <div className='w-full bg-backgroundVariants-100 h-full py-10'>
        <div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 max-w-[1400px] px-6 md:px-[72px] xl:px-0 mx-auto gap-[24px] gap-y-12'>
          {data.list.map((quote) => (
            <CustomerInfo
              key={quote.customerName}
              quoteId={quote.id}
              variant='submitted'
              movingType={[quote.request.moveType]}
              quoteState={quote.matched ? 'confirmedQuote' : 'pendingQuote'}
              isCustomQuote={quote.isCustomRequest}
              customerName={quote.customerName}
              movingDate={quote.request.moveDate}
              arrival={quote.request.arrival.sido}
              departure={quote.request.departure.sido}
              completed={quote.completed}
              declined={false}
              quotePrice={quote.price}
            />
          ))}
        </div>
      </div>
    )
  );
}
