import { useMutation, useQueryClient } from '@tanstack/react-query';
import userAuthService from '@/services/auth/userAuth';
import moverAuthService from '@/services/auth/moverAuth';
import { useRouter } from 'next/navigation';
import { MyProfile } from '@/services/auth/types';

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
        const userProfile = queryClient.getQueryData<MyProfile>([
          'userProfile',
        ]);
        if (userProfile?.profile === null)
          router.push('/user/profile/register');
        router.push('/user/movers');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
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
        const userProfile = queryClient.getQueryData<MyProfile>([
          'userProfile',
        ]);
        if (userProfile?.profile === null)
          router.push('/user/profile/register');
        router.push('/user/movers');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
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
        const userProfile = queryClient.getQueryData<MyProfile>([
          'userProfile',
        ]);
        if (userProfile?.profile === null)
          router.push('/mover/profile/register');
        router.push('/mover/quotes/requested');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
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
        const userProfile = queryClient.getQueryData<MyProfile>([
          'userProfile',
        ]);
        if (userProfile?.profile === null)
          router.push('/mover/profile/register');
        router.push('/mover/quotes/requested');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
    },
  });
};
