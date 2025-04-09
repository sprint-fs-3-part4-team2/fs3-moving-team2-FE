export interface Address {
  id: string;
  quoteRequestId: string;
  sido: string;
  sigungu: string;
  street: string;
  fullAddress: string;
  type: 'DEPARTURE' | 'ARRIVAL';
}

export interface Mover {
  id: string;
  userId: string;
  profileImage: string;
  experienceYears: number;
  introduction: string;
  description: string;
  averageRating: number;
  totalReviews: number;
  totalCustomerFavorite: number;
  totalConfirmedCount: number;
  createdAt: string;
  updatedAt: string;
  moverServices: MoverService[];
  user: User;
}

export interface User {
  id: string;
  userType: string;
  email: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoverService {
  id: string;
  moverId: string;
  serviceType: 'SMALL_MOVE' | 'OFFICE_MOVE' | 'HOME_MOVE';
  createdAt: string;
}

export interface MoverQuote {
  id: string;
  moverId: string;
  quoteRequestId: string;
  price: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  mover: Mover;
  targetedQuoteRequestId: string | null;
}

export interface Quote {
  moveDate: string;
  quoteRequestAddresses: Address[];
  moverQuotes: MoverQuote[];
  moveType: string;
  quoteStatusHistories: {
    quoteRequestId: string;
    status: string;
    updatedAt: string;
  }[];
}

export const getAddress = (
  addresses: Address[],
  type: 'DEPARTURE' | 'ARRIVAL',
) => {
  const address = addresses.find((addr) => addr.type === type);
  return address ? `${address.sido} ${address.sigungu}` : '정보 없음';
};

export const getMovingTypes = (
  moverQuote: MoverService[],
): ('small' | 'office' | 'home')[] => {
  return moverQuote.map((service) => {
    switch (service.serviceType) {
      case 'SMALL_MOVE':
        return 'small';
      case 'OFFICE_MOVE':
        return 'office';
      case 'HOME_MOVE':
        return 'home';
      default:
        return 'small';
    }
  });
};

export type QuoteState = 'confirmedQuote' | 'pendingQuote';
export type Variant = 'quote';
export type SubVariant = 'pending';

export interface MoverInfoTemplateProps {
  variant: Variant;
  subVariant: SubVariant;
  moverName: string;
  movingType: ('small' | 'office' | 'home')[];
  isCustomQuote: boolean;
  quoteState: QuoteState;
  rating: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite: boolean;
  totalCustomerFavorite: number;
  ratingCount: number;
  price: number;
  quoteId: string;
  movingDate: Date;
  departure: string;
  arrival: string;
  imageUrl: string;
  onConfirmClick: () => void;
  onDetailClick?: () => void;
  onFavoriteClick: (quoteId: string) => void;
  moverId: string;
}
