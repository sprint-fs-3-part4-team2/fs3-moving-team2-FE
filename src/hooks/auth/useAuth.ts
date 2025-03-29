import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';
import userAuthService from '@/services/auth/userAuth';
import moverAuthService from '@/services/auth/moverAuth';
import { useRouter } from 'next/navigation';

// User
export const useUserSignUp = () => {
  const router = useRouter();
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['userSignUp'],
    mutationFn: userAuthService.signUp,
    onSuccess: (data) => {
      login(data.user);
      router.push('/');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export const useUserSignIn = () => {
  const router = useRouter();
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: userAuthService.signIn,
    onSuccess: (data) => {
      login(data.user);
      router.push('/');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

// Mover
export const useMoverSignUp = () => {
  const router = useRouter();
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['moverSignUp'],
    mutationFn: moverAuthService.signUp,
    onSuccess: (data) => {
      login(data.user);
      router.push('/');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export const useMoverSignIn = () => {
  const router = useRouter();
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['moverSignIn'],
    mutationFn: moverAuthService.signIn,
    onSuccess: (data) => {
      login(data.user);
      router.push('/');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
