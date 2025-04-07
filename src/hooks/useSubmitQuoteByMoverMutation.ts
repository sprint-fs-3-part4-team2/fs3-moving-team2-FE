import { submitQuoteByMover } from '@/services/moverQuotes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from './useToaster';

interface SubmitQuoteParams {
  quoteId: string;
  price: number;
  comment: string;
}

export const useSubmitQuoteByMoverMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToaster();

  const mutation = useMutation({
    mutationFn: ({ quoteId, price, comment }: SubmitQuoteParams) =>
      submitQuoteByMover(quoteId, price, comment),
    onSuccess: () => {
      // 해당 API 가 다른 API에 영향을 받는다면 invalidateQueries를 사용 -> 목록 조회이니 영향을 받으니 invalidateQueries 사용
      queryClient.invalidateQueries({ queryKey: ['customerRequests'] });
      toast('info', '견적 보내기 성공');
      onClose();
    },
    onError: () => {
      toast('warn', '견적 보내기 실패');
      onClose();
    },
  });

  return mutation;
};
