import axiosInstance from '@/lib/axiosInstance';
import { TargetedQuoteRejection } from './types/targetedQuotes/targetedQuotes.types';

const TARGETED_QUOTE_URL = '/targeted-quote-requests';

// 지정 견적 요청 반려
export const rejectQuoteByMover = async (
  quoteId: string,
  rejectionReason: string,
) => {
  try {
    const { data } = await axiosInstance.post<TargetedQuoteRejection>(
      `${TARGETED_QUOTE_URL}/reject/${quoteId}`,
      {
        rejectionReason,
      },
    );
    return data;
  } catch (error: any) {
    console.error('지정 견적 반려 실패', error);
    throw error;
  }
};
