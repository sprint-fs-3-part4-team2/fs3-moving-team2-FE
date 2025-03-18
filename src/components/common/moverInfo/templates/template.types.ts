import {
  MoverDatePriceInfoProps,
  MoverStatInfoProps,
} from '../organisms/organism.types';
import {
  MovingStates,
  MovingTypes,
} from '../../shared/atoms/movingTypeBadge/movingTypeBadge.types';

export interface TemplateBaseProps {
  movingType: MovingTypes[];
  isCustomQuote: boolean;
  quoteState?: MovingStates;
}

export type MoverProfileProps = MoverStatInfoProps &
  TemplateBaseProps & {
    variant: 'moverList';
  };

export type CompletedQuoteProps = MoverStatInfoProps &
  TemplateBaseProps & {
    variant: 'quote';
    subVariant: 'completed';
    description?: string;
    price?: number;
  };

export type PendingQuoteProps = Omit<
  MoverStatInfoProps,
  'isFavoriteMoverList'
> &
  TemplateBaseProps & {
    variant: 'quote';
    quoteId: string;
    subVariant: 'pending';
    price?: number;
    movingDate: Date;
    departure: string;
    arrival: string;
    onConfirmClick: () => void;
  };

export type WrittenReviewProps = MoverDatePriceInfoProps &
  TemplateBaseProps & {
    variant: 'review';
    subVariant: 'written';
    reviewContent: string;
    writtenAt: Date;
  };

export type PendingReviewProps = MoverDatePriceInfoProps &
  TemplateBaseProps & {
    variant: 'review';
    subVariant: 'pending';
    onClickReviewButton: () => void;
  };

export type MoverInfoTemplateProps =
  | CompletedQuoteProps
  | PendingQuoteProps
  | PendingReviewProps
  | WrittenReviewProps;
