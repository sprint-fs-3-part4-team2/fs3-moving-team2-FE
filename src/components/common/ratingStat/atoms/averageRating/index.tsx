import { AverageRatingProps } from './averageRating.types';

export default function AverageRating({ averageRating }: AverageRatingProps) {
  return (
    <div className='flex font-bold items-baseline gap-2'>
      <span className='text-[40px] md:text-[40px] xl:text-[64px] text-black-400'>
        {averageRating}
      </span>
      <span className='text-[24px] md:text-[24px] xl:text-[38px] text-grayscale-100'>
        {'/ 5'}
      </span>
    </div>
  );
}
