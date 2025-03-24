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

export const getCompletedReviews = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/reviews/completed/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
