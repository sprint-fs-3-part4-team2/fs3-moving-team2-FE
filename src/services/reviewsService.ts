// services/reviewsService.ts
import { response } from 'express';
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
  console.log('getCompletedReviews');
  try {
    const response = await axiosInstance.get(`/reviews/completed/${id}`);
    console.log('데이터잘오나?', response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
