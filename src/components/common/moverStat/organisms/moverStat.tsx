import VerticalDivider from '../atoms/verticalDivider';
import ConfirmedQuotesCount from '../molecules/confirmedQuotesCount';
import ExperienceYears from '../molecules/experienceYears';
import Rating from '../molecules/rating';
import { MoverStatProps } from './moverStat.types';

export default function MoverStat({
  rating,
  quoteCount,
  years,
  ratingCount,
}: MoverStatProps) {
  return (
    <div className='flex gap-[14px] md:gap-[14px] xl:gap-4'>
      <Rating
        rating={rating}
        ratingCount={ratingCount}
      />
      <VerticalDivider />
      <ExperienceYears years={years} />
      <VerticalDivider />
      <ConfirmedQuotesCount quoteCount={quoteCount} />
    </div>
  );
}
