'use client';

import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ShareButtons from '@/components/common/ShareButtons';
import CustomerInfo from '@/components/common/customerInfo/templates/customerInfo';
import QuoteCard from '@/components/quoteCard/molecules/quoteCard';
import { useQuery } from '@tanstack/react-query';
import { getQuoteByMover } from '@/services/moverQuotes';
import { useMemo } from 'react';
import { MOVING_TYPES } from '@/constants/movingTypes';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = useQuery({
    queryKey: ['quotes', 'mover', id],
    queryFn: async () => getQuoteByMover(id),
  });

  const movingType = useMemo(
    () => data?.request.moveType as keyof typeof MOVING_TYPES,
    [data],
  );

  return (
    data && (
      <div className='relative flex flex-col mx-auto w-full items-center px-6 md:px-[72px] xl:px-0 max-w-[1400px]'>
        <div className='w-full'>
          <PageHeader>견적 상세</PageHeader>
        </div>
        <div className='flex w-full gap-[117px]'>
          <div className='flex flex-col gap-10 w-full'>
            <CustomerInfo
              quoteId={data.id}
              variant='submitted'
              movingType={[movingType]}
              quoteState={data.matched ? 'confirmedQuote' : 'pendingQuote'}
              isCustomQuote={data.isCustomRequest}
              customerName={data.customerName}
              movingDate={data.request.moveDate}
              arrival={data.request.arrival.sido}
              departure={data.request.departure.sido}
              completed={false}
              declined={false}
            />
            <div className='flex-col gap-10 flex md:flex xl:hidden'>
              <ShareButtons text='견적서 공유하기' />
              <HorizontalDivider />
            </div>
            <QuoteCard quotePrice={data.price}>견적가</QuoteCard>
            <HorizontalDivider />
            <MovingInfo
              requestedDate={data.request.createdAt}
              movingDate={data.request.moveDate}
              departure={data.request.departure.fullAddress}
              arrival={data.request.arrival.fullAddress}
              movingType={MOVING_TYPES[movingType].value}
            />
          </div>
          <div className='w-[328px] gap-[40px] hidden md:hidden xl:flex flex-col'>
            <ShareButtons text='견적서 공유하기' />
          </div>
        </div>
      </div>
    )
  );
}
