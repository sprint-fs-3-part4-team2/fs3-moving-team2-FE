import { headers } from 'next/headers';
import MoverDetailClient from './(client)/MoverDetailClient';
import { getMoverDetail } from '@/services/moverDetailService';
import Loading from '@/app/loading';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    // 개발 환경이거나 배포 환경에서는 토큰이 있을 때만 데이터를 가져옵니다
    const headersList = headers();
    const ssrToken = headersList.get(process.env.NEXT_PUBLIC_SSR!);
    const isDevelopment = process.env.NODE_ENV === 'development';

    // 개발 환경이거나 토큰이 있을 때 데이터를 가져옵니다
    const moverDetail = await getMoverDetail(
      params.id,
      isDevelopment ? null : ssrToken,
    );
    return <MoverDetailClient moverDetail={moverDetail} />;
  } catch (error) {
    console.error('기사 상세 정보 조회 에러:', error);
    return <div>기사 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }
}
