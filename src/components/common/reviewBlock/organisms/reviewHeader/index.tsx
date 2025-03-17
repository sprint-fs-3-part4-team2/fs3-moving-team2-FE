import cn from '@/utils/cn';
import NameDateDisplay from '../../molecules/nameDateDisplay';
import { ReviewHeaderProp } from './reviewHeader.type';
import RatingStars from '@/components/common/shared/molecules/ratingStars';

export default function ReviewHeader({
  name,
  writtenAt,
  rating,
  className,
}: ReviewHeaderProp): JSX.Element {
  
  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      <NameDateDisplay
        name={name}
        writtenAt={writtenAt}
      />
      <RatingStars
        rating={rating}
      />
    </div>
  );
}
