import { headers } from 'next/headers';
import MoverBasicInfoEditClient from './(client)/moverEdit';
import { moverInfoApi } from '@/services/moverEdit';
import Loading from '@/app/loading';

export default async function Page() {
  const headersList = headers();
  const ssrToken = headersList.get(process.env.NEXT_PUBLIC_SSR!);
  let value = null;

  if (ssrToken) {
    value = await moverInfoApi(ssrToken);
    return <MoverBasicInfoEditClient defaultValues={value?.data} />;
  } else return <Loading loading={!!ssrToken} />;
}
