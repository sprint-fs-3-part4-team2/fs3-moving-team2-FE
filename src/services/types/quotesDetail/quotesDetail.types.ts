import { QuoteBase } from './common.types';

export interface Mover {
  moverName: string;
  profileImage: string | null;
  experienceYears: number;
  introduction: string;
  averageRating: number;
  totalReviews: number;
  totalCustomerFavorite: number;
  totalConfirmedCount: number;
}

export interface QuoteForCustomer extends QuoteBase {
  mover: Mover;
}

export interface QuoteFormMover extends QuoteBase {
  customerName: string;
}
