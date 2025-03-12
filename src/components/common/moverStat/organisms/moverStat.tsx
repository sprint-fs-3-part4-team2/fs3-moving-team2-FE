import cn from '@/utils/cn';
import VerticalDivider from '../../shared/atoms/verticalDivider';
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
          : 'text-[13px] md:text-[13px] xl:text-[16px] gap-[9.5px] md:gap-[9.5px] xl:gap-[14px]',
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
