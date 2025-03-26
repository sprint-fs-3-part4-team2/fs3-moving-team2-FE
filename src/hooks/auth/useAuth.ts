import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';
import userAuthService from '@/services/auth/userAuth';

// User
export const useUserSignUp = () => {
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['userSignUp'],
    mutationFn: userAuthService.signUp,
    onSuccess: (data) => {
      login(data.user);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export const useUserSignIn = () => {
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: userAuthService.signIn,
    onSuccess: (data) => {
      login(data.user);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

// Mover
export const useMoverSignUp = () => {
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['moverSignUp'],
    mutationFn: userAuthService.signUp,
    onSuccess: (data) => {
      login(data.user);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export const useMoverSignIn = () => {
  const { login } = useUserStore();

  return useMutation({
    mutationKey: ['moverSignIn'],
    mutationFn: userAuthService.signIn,
    onSuccess: (data) => {
      login(data.user);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
