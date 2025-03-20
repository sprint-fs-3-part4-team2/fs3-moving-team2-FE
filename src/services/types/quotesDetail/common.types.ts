export interface Address {
  sido: string;
  sigungu: string;
  street: string;
  fullAddress: string;
}

export interface Request {
  id: string;
  customerId: string;
  moveType: string;
  moveDate: Date;
  createdAt: Date;
  updatedAt: Date;
  arrival: Address;
  departure: Address;
}

export interface QuoteBase {
  price: number;
  request: Request;
  customRequest: boolean;
  matched: boolean;
}

export interface QuoteRequest {
  moveType: string;
  moveDate: string;
  arrival: string;
  departure: string;
}
