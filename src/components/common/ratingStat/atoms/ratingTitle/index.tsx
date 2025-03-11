import cn from '@/utils/cn';
import { RatingTitleProps } from './ratingTitle.types';

export default function RatingTitle({ rating, highlighted }: RatingTitleProps) {
  return (
    <span
      className={cn(
        'text-[14px] md:text-[14px] xl:text-[20px] text-black-300 flex flex-shrink-0 w-[36px]',
        highlighted ? 'font-bold' : 'font-medium',
      )}
    >
      {rating}점
    </span>
  );
}
