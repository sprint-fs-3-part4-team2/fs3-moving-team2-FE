import MovingTypeBadge from '../../atoms/movingTypeBadge';
import { MovingTypeGroupProps } from './movingTypeGroup.types';

export default function MovingTypeGroup({
  quoteState,
  movingType,
  isCustomQuote,
}: MovingTypeGroupProps) {
  return (
    <div className='flex gap-2 md:gap-2 xl:gap-3'>
      {quoteState && <MovingTypeBadge type={quoteState} />}
      <MovingTypeBadge type={movingType} />
      {isCustomQuote && <MovingTypeBadge type={'custom'} />}
    </div>
  );
}
