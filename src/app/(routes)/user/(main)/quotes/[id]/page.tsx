'use client';

import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import CommonBtn from '@/components/common/commonBtn/commonBtn';
import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ShareButtons from '@/components/common/ShareButtons';
import QuoteCard from '@/components/quoteCard/molecules/quoteCard';
import { useQuery } from '@tanstack/react-query';
import { getQuoteByCustomer } from '@/services/quotes';
import { MOVING_TYPES } from '@/constants/movingTypes';
import { useMemo } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = useQuery({
    queryKey: ['quotes', 'customer', id],
    queryFn: async () => getQuoteByCustomer(id),
  });

  const movingType = useMemo(
    () => data?.request.moveType as keyof typeof MOVING_TYPES,
    [data],
  );

  return (
    data && (
      <div className='relative flex flex-col mx-auto w-full items-center overflow-auto pb-24'>
        <div className='flex w-full px-6 md:px-[72px] xl:px-0 max-w-[1400px]'>
          <PageHeader>견적 상세</PageHeader>
        </div>
        <div className='flex w-full px-6 md:px-[72px] xl:px-[100px] max-w-[1600px] gap-[117px]'>
          <div className='flex flex-col gap-10 w-full'>
            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName={data.mover.moverName}
              imageUrl={data.mover.profileImage}
              movingType={[movingType]}
              isCustomQuote={data.customRequest}
              quoteState={data.matched ? 'confirmedQuote' : 'pendingQuote'}
              rating={data.mover.averageRating}
              experienceYears={data.mover.experienceYears}
              quoteCount={data.mover.totalConfirmedCount}
              favoriteCount={data.mover.totalCustomerFavorite}
              ratingCount={data.mover.totalReviews}
              isFavoriteMoverList={false}
              description={data.mover.introduction}
            />
            <div className='flex-col gap-10 flex md:flex xl:hidden'>
              <ShareButtons text='견적서 공유하기' />
              <HorizontalDivider />
            </div>
            <QuoteCard quotePrice={data?.price}>견적가</QuoteCard>
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
            {!data.matched && (
              <>
                <CommonBtn
                  widthType='full'
                  heightType='primary'
                  backgroundColorType='blue'
                  textColorType='white'
                >
                  견적 확정하기
                </CommonBtn>
                <HorizontalDivider />
              </>
            )}
            <ShareButtons text='견적서 공유하기' />
          </div>
        </div>
        {!data.matched && (
          <div className='fixed md:fixed xl:hidden bottom-0 left-0 right-0 w-full px-6 md:px-[72px] max-w-[1400px] mx-auto py-[10px] border-t border-t-gray-50 bg-white'>
            <CommonBtn
              widthType='full'
              heightType='primary'
              backgroundColorType='blue'
              textColorType='white'
            >
              견적 확정하기
            </CommonBtn>
          </div>
        )}
      </div>
    )
  );
}
