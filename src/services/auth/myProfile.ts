import axiosInstance from '@/lib/axiosInstance';
import { handleApiError } from './apiHelpers';
import { MyProfile } from './types';

const getMyProfile = async (): Promise<MyProfile> => {
  try {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'get my profile');
  }
};

export default getMyProfile;
