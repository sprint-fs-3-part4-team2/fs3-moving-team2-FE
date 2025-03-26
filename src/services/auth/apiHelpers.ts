import { AxiosError } from 'axios';

// 공통 에러 처리
export const handleApiError = (error: unknown, context: string) => {
  const axiosError = error as AxiosError;
  console.error(
    `[API Error] ${context}:`,
    axiosError.response?.data || axiosError.message
  );
  throw error;
};
