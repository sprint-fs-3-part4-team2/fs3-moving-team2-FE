import MovingTypeBadge from '../../atoms/movingTypeBadge';
import { MovingTypeGroupProps } from './movingTypeGroup.types';

export default function MovingTypeGroup({
  quoteState,
  movingType,
  isCustomQuote,
}: MovingTypeGroupProps) {
  return (
    <div className='flex gap-2 md:gap-2 xl:gap-3 flex-shrink-0'>
      {quoteState && <MovingTypeBadge type={quoteState} />}
      {movingType.map((type) => (
        <MovingTypeBadge
          type={type}
          key={type}
        />
      ))}
      {isCustomQuote && <MovingTypeBadge type={'custom'} />}
    </div>
  );
}
