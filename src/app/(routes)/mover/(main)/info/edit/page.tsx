import { headers } from 'next/headers';
import MoverBasicInfoEditClient from './client';
import { moverInfoApi } from '@/services/moverEdit';

export default async function Page() {
  const headersList = headers();
  const customHeader = headersList.get('ssr-token');
  let value = null;

  try {
    if (!customHeader) return;
    value = await moverInfoApi(customHeader);
    console.log(value);
  } catch (err) {
    console.error(err);
  }

  return <MoverBasicInfoEditClient defaultValues={value.data} />;
}
