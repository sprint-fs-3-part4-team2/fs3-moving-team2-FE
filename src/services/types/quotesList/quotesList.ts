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
  price: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  mover: Mover;
  targetedQuoteRequestId: string | null;
}

export interface Quote {
  id: string;
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
  moverServices: MoverService[],
): ('small' | 'office' | 'home')[] => {
  return moverServices.map((service) => {
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

export const getMovingTypesForMovingInfo = (
  moverServices: MoverService[],
): ('소형이사' | '사무실이사' | '가정이사')[] => {
  return moverServices.map((service) => {
    switch (service.serviceType) {
      case 'SMALL_MOVE':
        return '소형이사';
      case 'OFFICE_MOVE':
        return '사무실이사';
      case 'HOME_MOVE':
        return '가정이사';
      default:
        return '소형이사';
    }
  });
};

export const getUserMovingInfo = (
  moveType: string,
): ('소형이사' | '사무실이사' | '가정이사')[] => {
  switch (moveType) {
    case 'SMALL_MOVE':
      return ['소형이사'];
    case 'OFFICE_MOVE':
      return ['사무실이사'];
    case 'HOME_MOVE':
      return ['가정이사'];
    default:
      return ['소형이사'];
  }
};

export type Variant = 'quote';
export type SubVariant = 'completed';

export interface MovingInfoProps {
  requestedDate: Date;
  movingDate: Date;
  movingType: ('소형이사' | '사무실이사' | '가정이사')[];
  departure: string;
  arrival: string;
}

export interface MoverInfoProps {
  variant: Variant;
  subVariant: SubVariant;
  moverName: string;
  movingType: ('small' | 'office' | 'home')[];
  isCustomQuote: boolean;
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
  isFavoriteMoverList: boolean;
  imageUrl: string;
  onFavoriteClick: (quoteId: string) => void;
  moverId: string;
  requestedDate: Date;
}
