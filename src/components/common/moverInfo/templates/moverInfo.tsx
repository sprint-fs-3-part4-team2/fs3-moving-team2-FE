'use client';

import WrittenAt from '../atoms/writtenAt';
import MoverDatePrice from '../organisms/moverDatePriceInfo';
import MoverStatInfo from '../organisms/moverStatInfo';
import { MoverInfoTemplateProps } from './template.types';
import ReviewContent from '../atoms/reviewContent';
import QuotePriceForList from '../../shared/atoms/quotePriceForList';
import MovingInfoForList from '../organisms/movingInfo';
import PendingQuoteButtons from '../molecules/pendingQuoteButtons';
import MovingTypeGroup from '../../shared/molecules/movingTypeGroup';
import { useRouter } from 'next/navigation';
import CommonButton from '../../commonBtn/commonBtn';

export default function MoverInfo(props: MoverInfoTemplateProps) {
  const commonProps = {
    moverName: props.moverName,
    imageUrl: props.imageUrl,
  };
  const router = useRouter();

  return (
    <div className='flex flex-col px-[14px] md:px-[14px] xl:px-6 py-4 md:py-4 xl:py-5 gap-[14px] md:gap-[14px] xl:gap-6 w-full shadow-primary cursor-default'>
      <div className='flex justify-between'>
        <div className='flex gap-2 md:gap-2 xl:gap-3'>
          <MovingTypeGroup
            quoteState={props.quoteState}
            movingType={props.movingType}
            isCustomQuote={props.isCustomQuote}
          />
        </div>
        {props.variant === 'review' && props.subVariant === 'written' && (
          <WrittenAt
            writtenDate={props.writtenAt}
            className='hidden md:hidden xl:flex'
          />
        )}
      </div>
      {props.variant === 'quote' && (
        <>
          {props.subVariant === 'completed' && props.description && (
            <div className='text-[14px] md:text-[14px] xl:text-[24px] font-semibold'>
              {props.description}
            </div>
          )}
          <div>
            <MoverStatInfo
              {...commonProps}
              rating={props.rating}
              ratingCount={props.ratingCount}
              experienceYears={props.experienceYears}
              isFavorite={props.isFavorite}
              isFavoriteMoverList={false}
              favoriteCount={props.favoriteCount}
              quoteCount={props.quoteCount}
            />
          </div>
          {props.subVariant === 'pending' && (
            <MovingInfoForList
              movingDate={props.movingDate}
              departure={props.departure}
              arrival={props.arrival}
              showDayOfWeek={true}
            />
          )}
          {props.price && (
            <div className='flex justify-end'>
              <QuotePriceForList price={props.price} />
            </div>
          )}
          {props.subVariant === 'pending' && (
            <PendingQuoteButtons
              onConfirmClick={props.onConfirmClick}
              onDetailClick={() => router.push(`/user/quotes/${props.quoteId}`)}
            />
          )}
        </>
      )}

      {props.variant === 'review' && (
        <>
          <MoverDatePrice
            {...commonProps}
            movingDate={props.movingDate}
            price={props.price}
            rating={props.rating}
          />
          <div className='xl:my-2'>
            {props.subVariant === 'written' && (
              <ReviewContent>{props.reviewContent}</ReviewContent>
            )}
            {props.subVariant === 'pending' && (
              <CommonButton
                onClick={props.onClickReviewButton}
                widthType='full'
                heightType='primary'
                className='rounded-[16px]'
              >
                리뷰 작성하기
              </CommonButton>
            )}
          </div>
          <div className='flex w-full justify-end'>
            {props.subVariant === 'written' && (
              <WrittenAt
                writtenDate={props.writtenAt}
                className='flex md:flex xl:hidden'
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
