import { TargetedQuoteRejection } from './../services/types/targetedQuotes/targetedQuotes.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from './useToaster';
import { rejectQuoteByMover } from '@/services/targetedQuotes';

interface RejectQuoteParams extends TargetedQuoteRejection {
  quoteId: string;
}

export const useRejectQuoteByMoverMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToaster();

  const mutation = useMutation({
    mutationFn: ({ quoteId, rejectionReason }: RejectQuoteParams) =>
      rejectQuoteByMover(quoteId, rejectionReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerRequests'] });
      toast('info', '지정 견적 반려 성공');
      onClose();
    },
    onError: () => {
      toast('warn', '지정 견적 반려 실패');
      onClose();
    },
  });

  return mutation;
};
