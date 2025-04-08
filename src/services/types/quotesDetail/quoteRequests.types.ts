import { QuoteRequest } from './common.types';

export interface QuoteRequestResponse {
  isRequested: boolean;
  quote?: QuoteRequest & {
    id: string;
    requestedDate: Date;
    status: string;
  };
}
