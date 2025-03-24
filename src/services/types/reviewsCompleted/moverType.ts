import { MOVING_TYPES } from '@/constants/movingTypes';

export interface Mover {
  id: string;
  driverName: string;
  movingType: (keyof typeof MOVING_TYPES)[];
  isCustomQuote: boolean;
  movingDate: Date;
  price: number;
  reviewContent: string;
  rating: number;
  writtenAt: Date;
  imageUrl: string;
}
