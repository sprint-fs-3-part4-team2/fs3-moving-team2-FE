import axiosInstance from '@/lib/axiosInstance';
interface MoverEditProps {
  name: string;
  email: string;
  phone_number: string;
  current_password: string;
}
export default async function moverEdit(body: MoverEditProps) {
  try {
    const res = await axiosInstance.post('/api/', body);
    return await res.data;
  } catch (err) {}
}
