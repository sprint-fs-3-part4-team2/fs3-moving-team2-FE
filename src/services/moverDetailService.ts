import { MoverDetail } from '@/services/types/mover';
import axiosInstance from '@/lib/axiosInstance';

export async function getMoverDetail(
  moverId: string,
  cookie?: string | null,
): Promise<MoverDetail> {
  const response = await axiosInstance.get(`/movers/${moverId}`, {
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
      Origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    },
  });
  return response.data.data;
}

export async function toggleFavorite(
  moverId: string,
): Promise<{ isFavorite: boolean; totalCustomerFavorite: number }> {
  const response = await axiosInstance.post(`/favorites/create/${moverId}`);
  return {
    isFavorite: true,
    totalCustomerFavorite: response.data.totalCustomerFavorite,
  };
}

export async function checkFavoriteStatus(
  moverId: string,
): Promise<{ isFavorite: boolean; totalCustomerFavorite: number }> {
  try {
    const response = await axiosInstance.get(`/favorites/check/${moverId}`);
    return response.data;
  } catch (error) {
    return {
      isFavorite: false,
      totalCustomerFavorite: 0,
    };
  }
}
