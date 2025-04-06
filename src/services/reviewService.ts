import { ReviewResponse } from './types/mover';
import axiosInstance from '@/lib/axiosInstance';

export async function getMoverReviewsById(
  moverId: string,
  page: number,
  itemsPerPage: number = 5,
): Promise<ReviewResponse> {
  const response = await axiosInstance.get(`/movers/${moverId}/reviews`, {
    params: {
      page,
      size: itemsPerPage,
    },
  });
  return response.data;
}
