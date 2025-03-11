import {
  MovingStates,
  MovingTypes,
} from '../../atoms/movingTypeBadge/movingTypeBadge.types';

export interface MovingTypeGroupProps {
  quoteState?: MovingStates;
  movingType: MovingTypes[];
  isCustomQuote: boolean;
}
