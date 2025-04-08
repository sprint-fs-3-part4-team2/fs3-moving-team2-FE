import { cancelQuoteRequest } from '@/services/quoteRequests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from './useToaster';

export const useCancelQuoteRequestMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToaster();

  const cancelQuoteRequestMutation = useMutation({
    mutationFn: (requestId: string) => cancelQuoteRequest(requestId),
    onSuccess: () => {
      queryClient.setQueryData(['myQuoteRequest'], () => ({
        requested: false,
      }));
      toast('info', '견적 요청 취소 성공');
      onClose();
    },
    onError: (error: ApiError) => {
      toast('warn', error.response?.data?.message || '견적 요청 취소 실패');
      onClose();
    },
  });

  return cancelQuoteRequestMutation;
};
