import axiosInstance from '../lib/axiosInstance';

export const getRejectedQuotes = () => {
  return axiosInstance
    .get('/rejection/rejected-quotes')
    .then((response) => response.data);
};
