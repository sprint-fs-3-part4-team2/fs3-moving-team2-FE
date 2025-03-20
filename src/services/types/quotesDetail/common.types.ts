export interface Address {
  sido: string;
  sigungu: string;
  street: string;
  fullAddress: string;
}

export interface QuoteRequest {
  moveType: string;
  moveDate: string;
  arrival: string;
  departure: string;
}

export interface QuoteBase {
  price: number;
  request: Request;
  customRequest: boolean;
  matched: boolean;
}
