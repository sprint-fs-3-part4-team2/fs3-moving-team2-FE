import axiosInstance from '@/lib/axiosInstance';

export const getQuoteByCustomer = async (quoteId: string) => {
  try {
    const quote = await axiosInstance.get(`/quotes/${quoteId}`);
    return quote.data;
  } catch {
    console.error('견적 불러오기 실패');
  }
};
