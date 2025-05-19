import { createServerAxiosInstance } from '@/lib/axiosForServer';

export const getQuoteRequest = async () => {
  const instance = createServerAxiosInstance();
  try {
    const response = await instance.get('/quote-requests/latest');
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
