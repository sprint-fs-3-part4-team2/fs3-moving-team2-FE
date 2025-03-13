import cn from '@/utils/cn';
import NameDateDisplay from '../../molecules/nameDateDisplay';
import StarRating from '../../molecules/starRating';
import { ReviewHeaderProp } from './reviewHeader.type';

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
      <StarRating rating={rating} />
    </div>
  );
}
