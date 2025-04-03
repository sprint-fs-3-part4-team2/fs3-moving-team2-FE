import { UserType } from '@/components/authPage/common.types';

interface MoverProfile {
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
}

interface CustomerProfile {
  id: string;
  userId: string;
  profileImage: string;
  location: string;
}

interface CommonInformation {
  email: string;
  name: string;
  phoneNumber: string;
  userType: UserType;
}
type RoleProfile = MoverProfile | CustomerProfile | null;

export type UserProfile = CommonInformation & {
  profile: RoleProfile;
};
