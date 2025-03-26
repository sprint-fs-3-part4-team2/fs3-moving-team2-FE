import axiosInstance from '@/lib/axiosInstance';
import { handleApiError } from './apiHelpers';
import { SignInData, SignUpData, AuthResponse } from './types';

const USER_AUTH_ENDPOINTS = {
  SIGNUP: '/user/auth/signUp',
  SIGNIN: '/user/auth/signIn',
};

const userAuthService = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        USER_AUTH_ENDPOINTS.SIGNUP,
        data,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, 'user signup');
    }
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        USER_AUTH_ENDPOINTS.SIGNIN,
        data,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, 'user signin');
    }
  },
};

export default userAuthService;