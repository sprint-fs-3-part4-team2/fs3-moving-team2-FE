import { MOVING_STATE, MOVING_TYPES } from '@/constants/movingTypes';

export type MovingTypes =
  (typeof MOVING_TYPES)[keyof typeof MOVING_TYPES]['key'];
export type MovingStates =
  (typeof MOVING_STATE)[keyof typeof MOVING_STATE]['key'];

export type MovingInfo = MovingTypes | MovingStates;

export interface MovingTypeBadgeProps {
  type: MovingInfo;
  className?: string;
}
