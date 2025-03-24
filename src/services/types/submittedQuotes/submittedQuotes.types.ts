import { QuoteForMover } from '../quotesDetail/quotesDetail.types';

export interface SubmittedQuotes {
  list: QuoteForMover[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
