import axiosInstance from '@/lib/axiosInstance';

export async function getChatRoomAPi() {
  try {
    const res = await axiosInstance.get('/chat/room');
    return await { ...res.data };
  } catch (error) {
    console.error('Error', error);
    return { ok: false, error };
  }
}
