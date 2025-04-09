import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAuthService from '@/services/auth/userAuth';
import moverAuthService from '@/services/auth/moverAuth';
import { useRouter } from 'next/navigation';
import { MyProfile } from '@/services/auth/types';
import { useToaster } from '../useToaster';

// User
export const useUserSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToaster();

  return useMutation({
    mutationKey: ['userSignUp'],
    mutationFn: userAuthService.signUp,
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.setQueryData<MyProfile>(['userProfile'], data);
        router.push('/user/movers');
      }, 1000);
    },
    onError: (error: ApiError) => {
      toast('warn', error.response?.data.message || '회원가입 실패');
    },
  });
};

export const useUserSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToaster();

  return useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: userAuthService.signIn,
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.setQueryData<MyProfile>(['userProfile'], data);
        router.push('/user/movers');
      }, 1000);
    },
    onError: (error: ApiError) => {
      toast('warn', error.response?.data?.message || '로그인 실패');
    },
  });
};

// Mover
export const useMoverSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToaster();

  return useMutation({
    mutationKey: ['moverSignUp'],
    mutationFn: moverAuthService.signUp,
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.setQueryData<MyProfile>(['userProfile'], data);
        return router.push('/mover/quotes/requested');
      }, 1000);
    },
    onError: (error: ApiError) => {
      toast('warn', error.response?.data.message || '회원가입 실패');
    },
  });
};

export const useMoverSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToaster();

  return useMutation({
    mutationKey: ['moverSignIn'],
    mutationFn: moverAuthService.signIn,
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.setQueryData<MyProfile>(['userProfile'], data);
        return router.push('/mover/quotes/requested');
      }, 1000);
    },
    onError: (error: ApiError) => {
      toast('warn', error.response?.data.message || '로그인 실패');
    },
  });
};
