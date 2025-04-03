import { headers } from 'next/headers';
import MoverBasicInfoEditClient from './client';
import { moverInfoApi } from '@/services/moverEdit';

export default async function Page() {
  const headersList = headers();
  const ssrToken = headersList.get('ssr-token');
  let value = null;

  try {
    if (!ssrToken) return;
    value = await moverInfoApi(ssrToken);
  } catch (err) {
    console.error(err);
  }

  return <MoverBasicInfoEditClient defaultValues={value.data} />;
}
