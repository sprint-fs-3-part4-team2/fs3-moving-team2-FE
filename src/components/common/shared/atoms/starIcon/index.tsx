import { StarIconProps } from './starIcon.types';
import Image from 'next/image';
import emptyStar from '@/public/icons/star/empty.svg';
import filledStar from '@/public/icons/star/filled.svg';
import cn from '@/utils/cn';

export default function StarIcon({
  onClick,
  filled,
  className,
}: StarIconProps) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Image
      className={cn(className, handleClick !== null && 'cursor-pointer')}
      onClick={handleClick}
      src={filled ? filledStar : emptyStar}
      alt='별점 아이콘'
      width={20}
      height={20}
    />
  );
}
