import cn from '@/utils/cn';
import { RatingCountProps } from './ratingCount.types';

export default function RatingCount({ count, highlighted }: RatingCountProps) {
  const formattedCount = count.toLocaleString() ?? 'invalid value';

  return (
    <div
      className={cn(
        'text-[14px] md:text-[14px] xl:text-[20px] text-grayscale-300',
        highlighted ? 'font-bold' : 'font-medium',
      )}
    >
      {formattedCount}
    </div>
  );
}
