import MovingTypeBadge from '../../shared/atoms/movingTypeBadge';
import WrittenAt from '../atoms/writtenAt';
import MoverDatePrice from '../organisms/moverDatePriceInfo';
import MoverStatInfo from '../organisms/moverStatInfo';
import { MoverInfoTemplateProps } from './template.types';
import ReviewContent from '../atoms/reviewContent';
import QuotePriceForList from '../../shared/atoms/quotePriceForList';
import MovingInfo from '../organisms/movingInfo';

export default function MoverInfo(props: MoverInfoTemplateProps) {
  const commonProps = {
    moverName: props.moverName,
    imageUrl: props.imageUrl,
  };

  return (
    <div className='flex flex-col px-[14px] md:px-[14px] xl:px-6 py-4 md:py-4 xl:py-5 gap-[10px] md:gap-[10px] xl:gap-6 w-full'>
      <div className='flex justify-between'>
        <div className='flex gap-2 md:gap-2 xl:gap-3'>
          {props.quoteState && <MovingTypeBadge type={props.quoteState} />}
          <MovingTypeBadge type={props.movingType} />
          {<MovingTypeBadge type={'custom'} />}
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
            <MovingInfo
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
            <div className='flex justify-between items-center gap-5'>
              <button
                className='w-1/2 bg-primary-blue-300 text-gray-50 py-4 rounded-[16px]'
                onClick={props.onConfirmClick}
              >
                견적 확정하기
              </button>
              <button
                className='w-1/2 border-[1px] border-primary-blue-300 text-primary-blue-300 text-gray-50 py-4 rounded-[16px]'
                onClick={props.onDetailClick}
              >
                상세보기
              </button>
            </div>
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
              <button
                onClick={props.onClickReviewButton}
                className='w-full bg-primary-blue-300 text-gray-50 py-4 rounded-[16px]'
              >
                리뷰 작성하기
              </button>
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
