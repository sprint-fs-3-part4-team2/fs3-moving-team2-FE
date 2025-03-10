import { RatingCounts } from '../common.types';

export interface RatingStatProps {
  averageRating: number;
  ratingCounts: RatingCounts;
  totalCount: number;
}
