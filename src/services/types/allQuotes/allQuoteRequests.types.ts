import { MovingTypes } from '@/components/common/shared/atoms/movingTypeBadge/movingTypeBadge.types';

export interface CustomerRequest {
  quoteId: string;
  movingType: MovingTypes[];
  isCustomQuote: boolean;
  customerName: string;
  movingDate: Date;
  departure: string;
  arrival: string;
  variant: 'requested' | 'submitted';
  requestedAt: Date;
}

export interface QuoteRequestsResponse {
  totalCount: number;
  list: CustomerRequest[];
  page: number;
  pageSize: number;
  totalPages: number;
}
