import { MOVING_STATE, MOVING_TYPES } from '@/constants/movingTypes';

export type MovingTypes =
  (typeof MOVING_TYPES)[keyof typeof MOVING_TYPES]['key'];

export type MovingStates = Exclude<
  (typeof MOVING_STATE)[keyof typeof MOVING_STATE]['key'],
  'custom'
>;

export type CustomQuote = Extract<
  (typeof MOVING_STATE)[keyof typeof MOVING_STATE]['key'],
  'custom'
>;

export type MovingInfo = MovingTypes | MovingStates | CustomQuote;

export interface MovingTypeBadgeProps {
  type: MovingInfo;
  className?: string;
}
