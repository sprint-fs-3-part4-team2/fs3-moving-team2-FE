'use client';

import cn from '@/utils/cn';
import VerticalDivider from '../../../shared/atoms/verticalDivider';
import ProfileImage from '../../../shared/atoms/profileImage';
import MoverName from '../../atoms/moverName';
import { MoverDatePriceInfoProps } from '../organism.types';
import RatingStars from '@/components/common/shared/molecules/ratingStars';
import ListInfo from '@/components/common/shared/molecules/listInfo';
import formatDate from '@/utils/formatDate';

export default function MoverDatePrice({
  moverName,
  imageUrl,
  movingDate,
  price,
  rating,
}: MoverDatePriceInfoProps) {
  const formattedDate = formatDate(movingDate, false, false);
  const formattedPrice = `${price.toLocaleString()}원`;

  return (
    <div
      className={cn(
        'flex items-center gap-3 md:gap-4 xl:gap-6 border-0 md:border-0 xl:border-[1px] xl:border-line-200 rounded-[6px]',
        'px-[8px] pl-0 py-[10px] md:px-[8px] md:py-[8px] xl:px-[18px] xl:py-[16px]',
      )}
    >
      <ProfileImage
        imageUrl={imageUrl}
        className='w-[46px] md:w-[46px] xl:w-[96px] h-[46px] md:h-[46px] xl:h-[96px]'
      />
      <div className={cn('flex flex-col', rating ? 'gap-2' : ' gap-4')}>
        <MoverName
          moverName={moverName}
          sizeVariant='primary'
        />
        <div
          className={cn(
            'flex gap-[5px] md:gap-[12.5px] xl:gap-4',
            rating && 'mb-2',
          )}
        >
          <ListInfo
            title='이사일'
            content={formattedDate}
          />
          <VerticalDivider />
          <ListInfo
            title='견적가'
            content={formattedPrice}
          />
        </div>
        {rating && <RatingStars rating={rating} />}
      </div>
    </div>
  );
}
