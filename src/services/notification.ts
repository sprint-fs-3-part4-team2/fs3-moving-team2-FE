import axiosInstance from '@/lib/axiosInstance';

export async function getNotificationApi() {
  try {
    const res = await axiosInstance.get('/notification');
    return await res.data;
  } catch (err) {
    return err;
  }
}

export async function readNotificationApi(id: string) {
  try {
    const res = await axiosInstance.patch(`/notification/${id}`);
    return await res.data;
  } catch (err) {
    return err;
  }
}
