import axiosInstance from '@/lib/axiosInstance';
import { FieldValues } from 'react-hook-form';

export default async function moverEditApi(body: FieldValues) {
  try {
    console.log(body);
    const res = await axiosInstance.post('/users/mover/baiscinfo/edit', body);
    return await res.data;
  } catch (err) {}
}
