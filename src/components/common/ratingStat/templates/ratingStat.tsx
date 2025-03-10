import ReviewStatHeader from '../atoms/reviewStatHeader';
import AverageRatingOrganism from '../organisms/averageRating';
import RatingRows from '../organisms/ratingRows';
import { RatingStatProps } from './ratingStat.types';

export default function RatingStat({
  averageRating,
  ratingCounts,
  totalCount,
}: RatingStatProps) {
  return (
    <div className='flex flex-col gap-[32px]'>
      <ReviewStatHeader totalCount={totalCount} />
      <div className='flex flex-col md:flex-row xl:flex-row gap-[40px] md:gap-[56px] xl:gap-[56px] items-center xl:bg-backgroundVariants-200 xl:px-[60px] xl:py-[40px] justify-center rounded-[32px]'>
        <AverageRatingOrganism averageRating={averageRating} />
        <RatingRows
          ratingCounts={ratingCounts}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
