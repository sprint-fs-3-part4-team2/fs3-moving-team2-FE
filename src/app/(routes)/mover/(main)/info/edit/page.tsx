import { headers } from 'next/headers';
import MoverBasicInfoEditClient from './moverEdit';
import { moverInfoApi } from '@/services/moverEdit';

export default async function Page() {
  const headersList = headers();
  const ssrToken = headersList.get('ssr-token');
  let value = null;

  try {
    if (ssrToken) value = await moverInfoApi(ssrToken);
  } catch (err) {
    console.error('ssr error:', err);
  }

  return <MoverBasicInfoEditClient defaultValues={value?.data} />;
}
