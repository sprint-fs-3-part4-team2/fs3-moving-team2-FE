import axiosInstance from '@/lib/axiosInstance';

// 일반 견적 요청 여부 확인
export const checkGeneralQuoteExists = async () => {
  const response = await axiosInstance.get('/quote-requests/latest');
  return response.data;
};

// 지정 견적 요청 생성
export const createTargetedQuoteRequest = async (moverId: string) => {
  const response = await axiosInstance.post('/targeted-quote-requests', {
    moverId,
  });
  return response.data;
};
