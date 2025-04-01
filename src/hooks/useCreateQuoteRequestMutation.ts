import { createQuoteRequest } from '@/services/quoteRequests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from './useToaster';
import { QuoteRequest } from '@/services/types/quotesDetail/common.types';

export const useCreateQuoteRequestMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToaster();

  const createQuoteRequestMutation = useMutation({
    mutationFn: (quoteRequestData: QuoteRequest) =>
      createQuoteRequest(quoteRequestData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myQuoteRequest'] });
      toast('info', '견적 요청 생성 성공');
      onClose();
    },
    onError: () => {
      toast('warn', '견적 요청 생성 실패');
      onClose();
    },
  });

  return createQuoteRequestMutation;
};
