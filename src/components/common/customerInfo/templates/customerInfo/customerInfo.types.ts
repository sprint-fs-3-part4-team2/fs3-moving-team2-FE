import {
  MovingStates,
  MovingTypes,
} from '@/components/common/shared/atoms/movingTypeBadge/movingTypeBadge.types';

export interface CustomerInfoBaseProps {
  quoteId: string;
  movingType: MovingTypes[];
  quoteState?: MovingStates;
  isCustomQuote: boolean;
  customerName: string;
  movingDate: Date;
  departure: string;
  arrival: string;
}

export interface RequestedQuoteProps extends CustomerInfoBaseProps {
  variant: 'requested';
  onSubmit: () => void;
  onDecline: () => void;
  requestedAt: Date;
}

export interface SubmittedQuoteProps extends CustomerInfoBaseProps {
  variant: 'submitted';
  quotePrice?: number;
  completed: boolean;
  declined: boolean;
}

export type CustomerInfoProps = RequestedQuoteProps | SubmittedQuoteProps;
