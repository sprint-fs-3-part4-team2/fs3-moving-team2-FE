import logoutApi from '@/services/auth/logoutApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['userProfile'] });
      router.push('/');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
};

export default useLogout;
