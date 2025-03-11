import RatingStars from '@/components/common/shared/molecules/ratingStars';
import AverageRating from '../../atoms/averageRating';
import { AverageRatingOrganismProps } from './averageRatingOrganism.types';

export default function AverageRatingOrganism({
  averageRating,
}: AverageRatingOrganismProps) {
  const starCount = Math.floor(averageRating);

  return (
    <div className='flex flex-col items-center'>
      <AverageRating averageRating={averageRating} />
      <RatingStars
        rating={starCount}
        iconClassName='w-[24px] md:w-[24px] xl:w-[40px] h-[24px] md:h-[24px] xl:h-[40px]'
      />
    </div>
  );
}
