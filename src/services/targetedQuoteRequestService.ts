import axiosInstance from '@/lib/axiosInstance';

// 일반 견적 요청 여부 확인
export const checkGeneralQuoteExists = async (cookie?: string) => {
  const response = await axiosInstance.get('/quote-requests/latest', {
    headers: cookie ? { Cookie: cookie } : undefined,
  });
  return response.data;
};

// 지정 견적 요청 생성
export const createTargetedQuoteRequest = async (
  moverId: string,
  cookie?: string,
) => {
  const response = await axiosInstance.post(
    '/targeted-quote-requests',
    { moverId },
    { headers: cookie ? { Cookie: cookie } : undefined },
  );
  return response.data;
};
