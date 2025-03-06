import { MOVING_TYPES } from '@/constants/movingTypes';

type MovingType = (typeof MOVING_TYPES)[keyof typeof MOVING_TYPES]['key'];

export interface MovingTypeBadgeProps {
  type: MovingType;
  className?: string;
}
