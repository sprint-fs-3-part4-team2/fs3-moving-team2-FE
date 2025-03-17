export interface Mover {
  moverName: string;
  profileImage: string | null;
  experienceYears: number;
  description: string;
  averageRating: number;
  totalReviews: number;
  totalCustomerFavorite: number;
  totalConfirmedCount: number;
}

export interface Request {
  id: string;
  customerId: string;
  moveType: string;
  moveDate: Date;
  createdAt: Date;
  updatedAt: Date;
  arrival: string;
  departure: string;
}

export interface QuoteForCustomer {
  price: number;
  mover: Mover;
  request: Request;
  customRequest: boolean;
  matched: boolean;
}
