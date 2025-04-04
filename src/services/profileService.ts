import axiosInstance from '@/lib/axiosInstance';

// 고객 프로필 등록
export const createCustomerProfile = async (data: any) => {
  try {
    const response = await axiosInstance.post('/profile/user/register', data);
    return response;
  } catch (err: any) {
    console.error('API 요청 오류:', err);
    console.log('서버 응답 데이터:', err.response?.data);
    const errorMessage = err.response?.data?.message || '알 수 없는 오류 발생';
    alert(errorMessage);

    throw err;
  }
};

// 기사 프로필 등록
export const createMoverProfile = async (data: any) => {
  try {
    const response = await axiosInstance.post('/profile/mover/register', data);
    return response;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || '알 수 없는 오류 발생';
    console.error('API 요청 오류:', err);
    return Promise.reject(errorMessage);
  }
};

// 고객 프로필 수정
export const updateCustomerProfile = async (data: any) => {
  try {
    const response = await axiosInstance.patch('/profile/user/edit', data);
    return response;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || '알 수 없는 오류 발생';
    console.error('API 요청 오류:', err);
    return Promise.reject(errorMessage);
  }
};

// 기사 프로필 수정
export const updateMoverProfile = async (data: any) => {
  try {
    const response = await axiosInstance.patch('/profile/mover/edit', data);
    return response;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || '알 수 없는 오류 발생';
    console.error('API 요청 오류:', err);
    return Promise.reject(errorMessage);
  }
};

//기사 프로필 조회
export const getMoverProfile = async () => {
  try {
    const response = await axiosInstance.get(`users/mover/profile`);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
