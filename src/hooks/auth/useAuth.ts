import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';
import userAuthService from '@/services/auth/userAuth';
import moverAuthService from '@/services/auth/moverAuth';
import { useRouter } from 'next/navigation';
import { useToaster } from '../useToaster';

// User
export const useUserSignUp = () => {
  const toast = useToaster();
  const router = useRouter();
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['userSignUp'],
    mutationFn: userAuthService.signUp,
    onSuccess: (data) => {
      login(data.user);
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
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: userAuthService.signIn,
    onSuccess: (data) => {
      login(data.user);
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
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['moverSignUp'],
    mutationFn: moverAuthService.signUp,
    onSuccess: (data) => {
      login(data.user);
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
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['moverSignIn'],
    mutationFn: moverAuthService.signIn,
    onSuccess: (data) => {
      login(data.user);
      router.push('/mover/quotes/requested');
    },
    onError: (error: any) => {
      toast('warn', `로그인 실패: ${error.response.data.message}`);
      console.error('로그인 실패:', error);
    },
  });
};
