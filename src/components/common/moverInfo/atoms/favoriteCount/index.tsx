import filled from '@/public/icons/favorite/filled.svg';
import redFilled from '@/public/icons/favorite/red-filled.svg';
import empty from '@/public/icons/favorite/default.svg';
import { FavoriteCountProps } from './favoriteCount.types';
import Image from 'next/image';
import cn from '@/utils/cn';

export default function FavoriteCount({
  favoriteCount,
  isFavorite,
  textClassName,
  iconClassName,
}: FavoriteCountProps) {
  const formattedLikeCount = favoriteCount.toLocaleString();

  return (
    <div className='flex items-center gap-[2px] md:gap-[2px] xl:gap-1'>
      <Image
        className={cn(iconClassName)}
        src={
          isFavorite === undefined
            ? filled
            : isFavorite === true
              ? redFilled
              : empty
        }
        alt='좋아요 아이콘'
        width={0}
        height={0}
      />
      <span
        className={cn(
          'text-[13px] md:text-[13px] xl:text-[18px] text-primary-blue-400 font-medium',
          textClassName,
        )}
      >
        {formattedLikeCount}
      </span>
    </div>
  );
}
