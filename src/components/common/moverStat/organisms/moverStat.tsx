import cn from '@/utils/cn';
import VerticalDivider from '../atoms/verticalDivider';
import ConfirmedQuotesCount from '../molecules/confirmedQuotesCount';
import ExperienceYears from '../molecules/experienceYears';
import RatingStat from '../molecules/ratingStat';
import { MoverStatProps } from './moverStat.types';

export default function MoverStat({
  rating,
  quoteCount,
  years,
  ratingCount,
  isFavoriteMoverInfo,
}: MoverStatProps) {
  return (
    <div
      className={cn(
        'flex font-medium',
        isFavoriteMoverInfo
          ? 'text-[13px] gap-[9.5px]'
          : 'text-[13px] md:text-[13px] xl:text-[16px] gap-[14px] md:gap-[14px] xl:gap-4',
      )}
    >
      <RatingStat
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
