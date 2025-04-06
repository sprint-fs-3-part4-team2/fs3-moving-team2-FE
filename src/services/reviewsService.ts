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
export const getCompletedReviews = async () => {
  try {
    const response = await axiosInstance.get(`/reviews/completed`);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

//기사님 리뷰 목록 조회API
export const getMoverReviews = async () => {
  try {
    const response = await axiosInstance.get(`/reviews/mover/review`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

// 특정 기사의 리뷰 목록 조회
export const getMoverReviewsById = async (
  moverId: string,
  page: number,
  limit: number,
  cookie?: string,
) => {
  try {
    const response = await axiosInstance.get(`/movers/${moverId}/reviews`, {
      params: {
        page,
        limit,
      },
      headers: cookie ? { Cookie: cookie } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
