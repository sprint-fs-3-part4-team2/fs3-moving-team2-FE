import { MovingTypeKey } from '@/app/(routes)/user/(main)/movers/page';

export type MoverDetail = {
  id: string;
  moverName: string;
  imageUrl: string;
  movingType: MovingTypeKey[];
  isCustomQuote: boolean;
  rating: number;
  ratingCount: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite: boolean;
  isFavoriteMoverList: boolean;
  favoriteCount: number;
  introduction: string;
  description: string;
  regions: string[];
};

export type Review = {
  id: string;
  name: string;
  writtenAt: string;
  rating: number;
  ratingCount: number;
  content: string;
  introduction: string;
  regions: string[];
};

export type RatingCounts = {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
};

export type ReviewResponse = {
  reviews: Review[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  averageRating: number;
  ratingCount: number;
  ratingCounts: RatingCounts;
};
