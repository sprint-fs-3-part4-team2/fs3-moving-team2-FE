import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAuthService from '@/services/auth/userAuth';
import moverAuthService from '@/services/auth/moverAuth';
import { useRouter } from 'next/navigation';
import { useToaster } from '../useToaster';

// User
export const useUserSignUp = () => {
  const queryClient = useQueryClient();
  const toast = useToaster();
  const router = useRouter();

  return useMutation({
    mutationKey: ['userSignUp'],
    mutationFn: userAuthService.signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(['myProfile'], () => data);
      router.push('/user/movers');
    },
    onError: (error: any) => {
      toast('warn', `회원가입 실패: ${error.Response.data.message}`);
      console.error('회원가입 실패:', error);
    },
  });
};

export const useUserSignIn = () => {
  const toast = useToaster();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: userAuthService.signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(['myProfile'], () => data);
      router.push('/user/movers');
    },
    onError: (error: any) => {
      toast('warn', `로그인 실패: ${error.response.data.message}`);
      console.error('로그인 실패:', error);
    },
  });
};

// Mover
export const useMoverSignUp = () => {
  const toast = useToaster();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['moverSignUp'],
    mutationFn: moverAuthService.signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(['myProfile'], () => data);
      router.push('/mover/quotes/requested');
    },
    onError: (error: any) => {
      toast('warn', `회원가입 실패: ${error.Response.data.message}`);
      console.error('회원가입 실패:', error);
    },
  });
};

export const useMoverSignIn = () => {
  const toast = useToaster();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['moverSignIn'],
    mutationFn: moverAuthService.signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(['myProfile'], () => data);
      router.push('/mover/quotes/requested');
    },
    onError: (error: any) => {
      toast('warn', `로그인 실패: ${error.response.data.message}`);
      console.error('로그인 실패:', error);
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: userAuthService.signOut,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.resetQueries({ queryKey: ['myProfile'] });
        queryClient.clear();
        router.push('/');
      }, 0);
    },
  });
};
