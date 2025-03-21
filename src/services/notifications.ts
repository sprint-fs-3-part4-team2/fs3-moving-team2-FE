import axiosInstance from '@/lib/axiosInstance';

// alarm 목록 가져오기
export const getNotifications = async () => {
  const notifications = await axiosInstance.get('/notification');
  return notifications.data;
};
// alarm 읽기 처리
export const updateAlarm = async (alarmId: string) => {
  const updatedAlarm = await axiosInstance.patch(`/notification/:${alarmId}`);
  return updatedAlarm.data;
};
