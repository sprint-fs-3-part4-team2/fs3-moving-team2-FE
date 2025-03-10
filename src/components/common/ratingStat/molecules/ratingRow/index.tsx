import RatingBar from '../../atoms/ratingBar';
import RatingCount from '../../atoms/ratingCount';
import RatingTitle from '../../atoms/ratingTitle';
import { RatingRowProps } from './ratingRow.types';

export default function RatingRow({
  rating,
  count,
  highlighted,
}: RatingRowProps) {
  return (
    <div className='flex gap-[16px] md:gap-[16px] xl:gap-[30px] items-center h-[24px] md:h-[24px] xl:h-[32px]'>
      <RatingTitle
        rating={rating}
        highlighted={highlighted}
      />
      <RatingBar percentage={5} />
      <RatingCount
        count={count}
        highlighted={highlighted}
      />
    </div>
  );
}
