import axiosInstance from '@/lib/axiosInstance';
import { FieldValues } from 'react-hook-form';

export async function moverEditApi(body: FieldValues) {
  try {
    const res = await axiosInstance.patch('/users/mover/basicinfo', body);
    return await res.data;
  } catch (err: any) {
    return err;
  }
}

export async function moverInfoApi() {
  try {
    const res = await axiosInstance.get('/users/mover/basicinfo');
    return await res.data;
  } catch (err: any) {
    return err;
  }
}
