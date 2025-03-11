import { RatingBarProps } from './ratingBar.types';

export default function RatingBar({ percentage }: RatingBarProps) {
  return (
    <div className='relative w-[180px] md:w-[180px] xl:w-[370px] h-3 bg-backgroundVariants-300 rounded-full '>
      <div
        className='absolute top-0 left-0 h-full bg-secondary-yellow-100 rounded-full'
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
