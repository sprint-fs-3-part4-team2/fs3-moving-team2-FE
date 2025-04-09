'use client';

import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import CommonBtn from '@/components/common/commonBtn/commonBtn';
import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ShareButtons from '@/components/common/ShareButtons';
import QuoteCard from '@/components/quoteCard/molecules/quoteCard';
import { MOVING_TYPES } from '@/constants/movingTypes';
import { useQuoteDetailByCustomerQuery } from '@/hooks/useQuoteDetailByCustomerQuery';
import ModalWrapper from '@/components/modal/ModalWrapper';
import ConfirmQuoteModalContent from '@/components/common/confirmQuoteModalContent';
import { useHandleModalOpen } from '@/hooks/useHandleModalOpen';
import useUserProfile from '@/hooks/auth/useUserProfile';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = useQuoteDetailByCustomerQuery(id);
  const { data: profile } = useUserProfile();
  const { modalOpen, openModal, closeModal } = useHandleModalOpen();
  const movingType = data?.request.moveType as keyof typeof MOVING_TYPES;
  const notMatched = data?.matched === false;
  const isRequestedStatus = data?.request.currentStatus === 'QUOTE_REQUESTED';
  const isCustomersQuote = data?.request.customerId === profile?.profile?.id;
  const showConfirmButton = notMatched && isRequestedStatus && isCustomersQuote;

  return (
    data && (
      <div className='relative flex flex-col mx-auto w-full items-center overflow-auto pb-24'>
        {modalOpen && (
          <ModalWrapper
            onClose={closeModal}
            title='견적 확정하기'
            className='xl:w-[608px]'
          >
            <ConfirmQuoteModalContent
              onClose={closeModal}
              moverQuoteId={id}
            />
          </ModalWrapper>
        )}
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
              isCustomQuote={data.isCustomRequest}
              quoteState={
                data.matched
                  ? 'confirmedQuote'
                  : isRequestedStatus
                    ? 'pendingQuote'
                    : undefined
              }
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
            {showConfirmButton && (
              <>
                <CommonBtn
                  widthType='full'
                  heightType='primary'
                  backgroundColorType='blue'
                  textColorType='white'
                  onClick={openModal}
                >
                  견적 확정하기
                </CommonBtn>
                <HorizontalDivider />
              </>
            )}
            <ShareButtons text='견적서 공유하기' />
          </div>
        </div>
        {showConfirmButton && (
          <div className='fixed md:fixed xl:hidden bottom-0 left-0 right-0 w-full px-6 md:px-[72px] max-w-[1400px] mx-auto py-[10px] border-t border-t-gray-50 bg-white'>
            <CommonBtn
              widthType='full'
              heightType='primary'
              backgroundColorType='blue'
              textColorType='white'
              onClick={openModal}
            >
              견적 확정하기
            </CommonBtn>
          </div>
        )}
      </div>
    )
  );
}
