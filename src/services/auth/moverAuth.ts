import axiosInstance from '@/lib/axiosInstance';
import { handleApiError } from './apiHelpers';
import { SignInData, SignUpData, AuthResponse } from './types';

const MOVER_AUTH_ENDPOINTS = {
  SIGNUP: 'auth/sign-up/mover',
  SIGNIN: 'auth/sign-in/mover',
};

const moverAuthService = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        MOVER_AUTH_ENDPOINTS.SIGNUP,
        data,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, 'mover signup');
    }
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        MOVER_AUTH_ENDPOINTS.SIGNIN,
        data,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, 'mover signin');
    }
  },
};

export default moverAuthService;
