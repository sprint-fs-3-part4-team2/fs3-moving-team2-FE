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

//내가 작성한 리뷰 (리뷰 목록 조회API)
export const getCompletedReviews = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/reviews/completed/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

//기사님 리뷰 목록 조회API
export const getMoverReviews = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/reviews/mover/review/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
