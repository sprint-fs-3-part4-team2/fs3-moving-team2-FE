import { useMutation } from '@tanstack/react-query';
import userAuthService from '@/services/auth/userAuth';
import moverAuthService from '@/services/auth/moverAuth';
import { useRouter } from 'next/navigation';

// User
export const useUserSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['userSignUp'],
    mutationFn: userAuthService.signUp,
    onSuccess: () => {

      setTimeout(() => {
        router.push('/user/profile/register');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export const useUserSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: userAuthService.signIn,
    onSuccess: (data) => {
      console.log('로그인 성공, user data: ', data);
      setTimeout(() => {
        router.push('/user/profile/register');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
    },
  });
};

// Mover
export const useMoverSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['moverSignUp'],
    mutationFn: moverAuthService.signUp,
    onSuccess: () => {
      setTimeout(() => {
        router.push('/mover/quote/requested');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export const useMoverSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['moverSignIn'],
    mutationFn: moverAuthService.signIn,
    onSuccess: () => {
      setTimeout(() => {
        router.push('/mover/quote/requested');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
    },
  });
};
