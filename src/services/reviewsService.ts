// services/reviewsService.ts
import axiosInstance from '../lib/axiosInstance';

export const getPendingReviews = () => {
  return axiosInstance
    .get('/reviews/pending')
    .then((response) => response.data);
};

export const submitReview = (reviewData: {
  estimateId: string;
  rating: number;
  comment: string;
}) => {
  return axiosInstance
    .post('/reviews', reviewData)
    .then((response) => response.data);
};
