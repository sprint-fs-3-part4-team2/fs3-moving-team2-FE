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
