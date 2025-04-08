import { MOVING_TYPES } from '@/constants/movingTypes';
export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  phoneNumber: string;
}

interface profile {
  id: string;
  userId: string;
  profileImage: string;
  location: string;
  experienceYears: number; // 여기 3개 추가
  introduction: string;
  description: string;
}

export interface MoverType {
  id: string;
  moverName: string;
  movingType: (keyof typeof MOVING_TYPES)[];
  isCustomQuote: boolean;
  movingDate: Date;
  price: number;
  reviewContent: string;
  rating: number;
  writtenAt: Date;
  imageUrl: string;
}

export interface AuthResponse {
  email: string;
  name: string;
  phoneNumber: string;
  userType: 'customer' | 'mover';
  profile: profile | null;
}

export type MyProfile = AuthResponse;
