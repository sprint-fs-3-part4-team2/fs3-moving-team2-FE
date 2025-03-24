import cn from '@/utils/cn';
import MovingTypeBadge from '../../atoms/movingTypeBadge';
import { MovingTypeGroupProps } from './movingTypeGroup.types';

export default function MovingTypeGroup({
  quoteState,
  movingType,
  isCustomQuote,
  isFavoriteMoverInfo = false,
}: MovingTypeGroupProps) {
  const className = isFavoriteMoverInfo && 'xl:text-[13px] pl-[2px] pr-[6px]';
  return (
    <div className='flex gap-2 md:gap-2 xl:gap-3 flex-shrink-0'>
      {quoteState && (
        <MovingTypeBadge
          className={cn(className)}
          type={quoteState}
        />
      )}
      {movingType.map((type) => (
        <MovingTypeBadge
          type={type}
          key={type}
          className={cn(className)}
        />
      ))}
      {isCustomQuote && (
        <MovingTypeBadge
          type={'custom'}
          className={cn(className)}
        />
      )}
    </div>
  );
}
