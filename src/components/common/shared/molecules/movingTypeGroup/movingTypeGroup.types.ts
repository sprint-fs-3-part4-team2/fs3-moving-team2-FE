import {
  MovingStates,
  MovingTypes,
} from '../../atoms/movingTypeBadge/movingTypeBadge.types';

export interface MovingTypeGroupProps {
  quoteState?: Exclude<MovingStates, 'custom'>;
  movingType: MovingTypes[];
  isCustomQuote: boolean;
}
