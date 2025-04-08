import { createQuoteRequest } from '@/services/quoteRequests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToaster } from './useToaster';
import { QuoteRequest } from '@/services/types/quotesDetail/common.types';

export const useCreateQuoteRequestMutation = (
  onSuccess?: () => void,
  onError?: () => void,
) => {
  const queryClient = useQueryClient();
  const toast = useToaster();

  const createQuoteRequestMutation = useMutation({
    mutationFn: (quoteRequestData: QuoteRequest) =>
      createQuoteRequest(quoteRequestData),
    onSuccess: (data) => {
      toast('info', '견적 요청 생성 성공');
      // 다른 유저나 영향이 없는 쿼리라면 invalidateQueries를 사용하지 않고 setQueryData로 직접 업데이트 -> 낙관적인 업데이트
      queryClient.setQueryData(['myQuoteRequest-response'], data);

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: () => {
      toast('warn', '견적 요청 생성 실패');
      if (onError) {
        onError();
      }
    },
  });

  return createQuoteRequestMutation;
};
