import { confirmQuoteByCustomer } from '@/services/moverQuotes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from './useToaster';

export const UseConfirmQuoteMutation = (
  moverQuoteId: string,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();
  const toast = useToaster();

  const confirmQuoteMutation = useMutation({
    mutationFn: () => confirmQuoteByCustomer(moverQuoteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quotes', 'customer', moverQuoteId],
      });
      toast('info', '견적 확정에 성공했습니다.');
      onClose();
    },
    onError: () => {
      toast('warn', '견적 확정에 실패했습니다.');
      onClose();
    },
  });

  return confirmQuoteMutation;
};
