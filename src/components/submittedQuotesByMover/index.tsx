'use client';

import CustomerInfo from '@/components/common/customerInfo/templates/customerInfo';
import { getSubmittedQuotesList } from '@/services/quotes';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../pagination/molecule/pagination';

export default function SubmittedQuotesByMover() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageSize = 6;
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['quotes', page, pageSize],
    queryFn: async () => getSubmittedQuotesList({ page, pageSize }),
  });

  const onPageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    data && (
      <div className='w-full flex items-center flex-col gap-10'>
        <div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 max-w-[1400px] w-full px-6 md:px-[72px] xl:px-0 mx-auto gap-[24px] gap-y-12'>
          {data.list.map((quote) => {
            return (
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
            );
          })}
        </div>
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    )
  );
}
