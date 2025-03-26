import { cancelQuoteRequest } from '@/services/quoteRequests';
import { QueryClient, useMutation } from '@tanstack/react-query';

export const useCancelQuoteRequestMutation = (onClose: () => void) => {
  const queryClient = new QueryClient();
  const cancelQuoteRequestMutation = useMutation({
    mutationFn: async (requestId: string) => cancelQuoteRequest(requestId),
    onSuccess: () => {
      queryClient.setQueryData(['quoteRequest'], () => ({
        requested: false,
      }));
      onClose();
    },
    onError: () => {},
  });

  return cancelQuoteRequestMutation;
};
