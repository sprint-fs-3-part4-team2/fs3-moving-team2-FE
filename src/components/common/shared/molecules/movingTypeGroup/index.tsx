import cn from '@/utils/cn';
import MovingTypeBadge from '../../atoms/movingTypeBadge';
import { MovingTypeGroupProps } from './movingTypeGroup.types';

export default function MovingTypeGroup({
  quoteState,
  movingType,
  isCustomQuote,
  isFavoriteMoverInfo = false,
}: MovingTypeGroupProps) {
  return (
    <div className='flex gap-2 md:gap-2 xl:gap-3 flex-shrink-0'>
      {quoteState && <MovingTypeBadge type={quoteState} />}
      {movingType.map((type) => (
        <MovingTypeBadge
          type={type}
          key={type}
          className={cn(isFavoriteMoverInfo && 'text-[13px] pl-[2px] pr-[6px]')}
        />
      ))}
      {isCustomQuote && <MovingTypeBadge type={'custom'} />}
    </div>
  );
}
