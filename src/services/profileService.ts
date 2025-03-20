import axiosInstance from '@/lib/axiosInstance';

// 고객 프로필 등록
export const createCustomerProfile = async (data: any) => {
  try {
    const response = await axiosInstance.post('/profile/user/register', data);
    return response;
  } catch (err) {
    console.error('API 요청 오류:', err);
    throw err;
  }
};

// 기사 프로필 등록
export const createMoverProfile = async (data: any) => {
  try {
    const response = await axiosInstance.post('/profile/mover/register', data);
    return response;
  } catch (err) {
    console.error('API 요청 오류:', err);
    throw err;
  }
};

// 고객 프로필 수정
export const updateCustomerProfile = async (data: any) => {
  try {
    const response = await axiosInstance.patch('/profile/user/edit', data);
    return response;
  } catch (err) {
    console.error('API 요청 오류:', err);
    throw err;
  }
};

// 기사 프로필 수정
export const updateMoverProfile = async (data: any) => {
  try {
    const response = await axiosInstance.patch('/profile/mover/edit', data);
    return response;
  } catch (err) {
    console.error('API 요청 오류:', err);
    throw err;
  }
};
