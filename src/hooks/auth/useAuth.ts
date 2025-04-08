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
      queryClient.setQueryData<MyProfile>(['userProfile'], data);
      if (data.profile === null) router.push('/user/profile/register');
      router.push('/user/movers');
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
      queryClient.setQueryData<MyProfile>(['userProfile'], data);
      if (data.profile === null) router.push('/user/profile/register');
      router.push('/user/movers');
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
      queryClient.setQueryData<MyProfile>(['userProfile'], data);
      if (data.profile === null) router.push('/mover/profile/register');
      router.push('/mover/quotes/requested');
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
      queryClient.setQueryData<MyProfile>(['userProfile'], data);
      if (data.profile === null) router.push('/mover/profile/register');
      router.push('/mover/quotes/requested');
    },
    onError: (error: ApiError) => {
      toast('warn', error.response?.data.message || '로그인 실패');
    },
  });
};
