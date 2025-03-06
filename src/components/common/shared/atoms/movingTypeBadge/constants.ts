import small from '@/public/icons/moving-types/small.svg';
import home from '@/public/icons/moving-types/home.svg';
import office from '@/public/icons/moving-types/office.svg';
import custom from '@/public/icons/moving-types/custom-quote.svg';
import { MOVING_TYPES } from '@/constants/movingTypes';

const BADGE_STYLES = {
  blue: 'bg-primary-blue-100 text-primary-blue-300',
  red: 'bg-secondary-red-100 text-secondary-red-200',
  gray: 'bg-primary-blue-10 text-primary-blue-400',
};

export const options = {
  [MOVING_TYPES.small.key]: {
    text: MOVING_TYPES.small.value,
    style: BADGE_STYLES.blue,
    icon: small,
  },
  [MOVING_TYPES.office.key]: {
    text: MOVING_TYPES.office.value,
    style: BADGE_STYLES.blue,
    icon: office,
  },
  [MOVING_TYPES.home.key]: {
    text: MOVING_TYPES.home.value,
    style: BADGE_STYLES.blue,
    icon: home,
  },
  [MOVING_TYPES.custom.key]: {
    text: MOVING_TYPES.custom.value,
    style: BADGE_STYLES.red,
    icon: custom,
  },
  [MOVING_TYPES.confirmedQuotes.key]: {
    text: MOVING_TYPES.confirmedQuotes.value,
    style: BADGE_STYLES.gray,
    icon: undefined,
  },
  [MOVING_TYPES.pendingQuote.key]: {
    text: MOVING_TYPES.pendingQuote.value,
    style: BADGE_STYLES.gray,
    icon: undefined,
  },
};
