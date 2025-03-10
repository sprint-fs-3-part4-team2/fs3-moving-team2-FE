import RatingRow from '../../molecules/ratingRow';
import { RatingRowsProps } from './ratingRows.types';

export default function RatingRows({ ratingCounts }: RatingRowsProps) {
  const largestCount = Math.max(...(Object.values(ratingCounts) as number[]));
  const ratingCountsArray = Object.entries(ratingCounts).sort(
    (a, b) => Number(b[0]) - Number(a[0]),
  );

  return (
    <div className='flex flex-col gap-[6px] md:gap-[6px] xl:gap-[14px] px-[21.5px] md:px-[21.5px] xl:px-0 py-[16px] md:py-[16px] xl:py-0 bg-backgroundVariants-200 xl:bg-transparent rounded-[24px]'>
      {ratingCountsArray.map(([rating, ratingCount]) => (
        <RatingRow
          key={rating}
          rating={+rating}
          count={ratingCount}
          highlighted={ratingCount === largestCount}
        />
      ))}
    </div>
  );
}
