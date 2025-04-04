import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAuthService from '@/services/auth/userAuth';
import moverAuthService from '@/services/auth/moverAuth';
import { useRouter } from 'next/navigation';
import { MyProfile } from '@/services/auth/types';
import handleAuthError from '@/utils/handleAuthError';

// User
export const useUserSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['userSignUp'],
    mutationFn: userAuthService.signUp,
    onSuccess: (data) => {
      queryClient.setQueryData<MyProfile>(['userProfile'], data);
      setTimeout(() => {
        const userData = queryClient.getQueryData<MyProfile>(['userProfile']);
        const userProfile = userData?.profile;
        if (userProfile !== null) router.push('/user/movers');
        if (userProfile === null) router.push('/user/profile/register');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
      router.push(handleAuthError('user', 'sign-up', error));
    },
  });
};

export const useUserSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: userAuthService.signIn,
    onSuccess: (data) => {
      queryClient.setQueryData<MyProfile>(['userProfile'], data);
      setTimeout(() => {
        const userData = queryClient.getQueryData<MyProfile>(['userProfile']);
        const userProfile = userData?.profile;
        if (userProfile !== null) router.push('/user/movers');
        if (userProfile === null) router.push('/user/profile/register');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
      router.push(handleAuthError('user', 'sign-in', error));
    },
  });
};

// Mover
export const useMoverSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['moverSignUp'],
    mutationFn: moverAuthService.signUp,
    onSuccess: (data) => {
      queryClient.setQueryData<MyProfile>(['userProfile'], data);
      setTimeout(() => {
        const userData = queryClient.getQueryData<MyProfile>(['userProfile']);
        const userProfile = userData?.profile;
        if (userProfile !== null) router.push('/mover/quotes/requested');
        if (userProfile === null) router.push('/mover/profile/register');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
      router.push(handleAuthError('mover', 'sign-up', error));
    },
  });
};

export const useMoverSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['moverSignIn'],
    mutationFn: moverAuthService.signIn,
    onSuccess: (data) => {
      queryClient.setQueryData<MyProfile>(['userProfile'], data);
      setTimeout(() => {
        const userData = queryClient.getQueryData<MyProfile>(['userProfile']);
        const userProfile = userData?.profile;
        if (userProfile !== null) router.push('/mover/quotes/requested');
        if (userProfile === null) router.push('/mover/profile/register');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
      router.push(handleAuthError('mover', 'sign-in', error));
    },
  });
};
