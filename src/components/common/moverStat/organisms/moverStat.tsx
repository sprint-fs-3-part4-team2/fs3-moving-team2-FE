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
  const variant = isFavoriteMoverInfo ? 'secondary' : 'primary';

  return (
    <div
      className={cn(
        'flex font-medium',
        isFavoriteMoverInfo
          ? 'text-[12.5px] gap-[9.5px]'
          : 'text-[13px] md:text-[13px] xl:text-[16px] gap-[3.5px] md:gap-[9.5px] xl:gap-[14px]',
      )}
    >
      <RatingStat
        isFavoriteMoverInfo={isFavoriteMoverInfo}
        rating={rating}
        ratingCount={ratingCount}
      />
      <VerticalDivider />
      <ExperienceYears
        years={years}
        isFavoriteMoverInfo={isFavoriteMoverInfo}
      />
      <VerticalDivider />
      <ConfirmedQuotesCount
        quoteCount={quoteCount}
        isFavoriteMoverInfo={isFavoriteMoverInfo}
      />
    </div>
  );
}
