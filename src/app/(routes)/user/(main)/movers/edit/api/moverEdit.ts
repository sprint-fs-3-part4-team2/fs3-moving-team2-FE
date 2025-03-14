import axiosInstance from '@/lib/axiosInstance';
import { FieldValues } from 'react-hook-form';

export default async function moverEditApi(body: FieldValues) {
  try {
    const res = await axiosInstance.post('/users/mover/baiscinfo/edit', body);
    return await res.data;
  } catch (err: any) {
    return err.response.data;
  }
}
