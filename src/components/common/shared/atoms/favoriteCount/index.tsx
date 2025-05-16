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
  onClick,
}: FavoriteCountProps) {
  const formattedLikeCount = favoriteCount > 999 ? '+999' : favoriteCount;
  const IconComponent = onClick ? 'button' : 'div';

  return (
    <div className='flex items-center gap-[2px] md:gap-[2px] xl:gap-1'>
      <IconComponent
        onClick={onClick}
        className={cn(iconClassName, onClick && 'cursor-pointer')}
        type={onClick ? 'button' : undefined}
        aria-label={
          onClick ? (isFavorite ? '찜하기 취소 버튼' : '찜하기 버튼') : ''
        }
      >
        <Image
          src={
            isFavorite === undefined
              ? filled
              : isFavorite === true
                ? redFilled
                : empty
          }
          alt={onClick ? '' : '찜하기 아이콘'}
          width={0}
          height={0}
        />
      </IconComponent>
      <span
        className={cn(
          'text-[13px] md:text-[13px] xl:text-[18px] text-primary-blue-400 font-medium',
          textClassName,
        )}
        aria-label={`찜하기 ${formattedLikeCount}개`}
      >
        {formattedLikeCount}
      </span>
    </div>
  );
}
