import axiosInstance from '@/lib/axiosInstance';
import { handleApiError } from './apiHelpers';

const logoutApi = async () => {
  try {
    const response = await axiosInstance.post('/auth/sign-out');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'logout');
  }
};

export default logoutApi;
