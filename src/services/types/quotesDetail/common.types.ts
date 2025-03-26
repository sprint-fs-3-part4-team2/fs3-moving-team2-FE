import { MOVING_TYPES } from '@/constants/movingTypes';

export interface Address {
  sido: string;
  sigungu: string;
  street: string;
  fullAddress: string;
}

export interface Request {
  id: string;
  customerId: string;
  moveType: keyof typeof MOVING_TYPES;
  moveDate: Date;
  createdAt: Date;
  updatedAt: Date;
  arrival: Address;
  departure: Address;
}

export interface QuoteBase {
  price: number;
  request: Request;
  isCustomRequest: boolean;
  matched: boolean;
}

export interface QuoteRequest {
  moveType: (typeof MOVING_TYPES)[keyof typeof MOVING_TYPES]['value'];
  moveDate: Date;
  arrival: Address;
  departure: Address;
}
