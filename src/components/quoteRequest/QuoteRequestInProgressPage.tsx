import CommonButton from '@/components/common/commonBtn/commonBtn';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import useQuoteRequestStore from '@/store/quoteRequestStore';
import combineDateTime from '@/utils/combineDateTime';
import Link from 'next/link';

export default function QuoteRequestInProgressPage() {
  const { registerData } = useQuoteRequestStore();

  if (!registerData) {
    return <div>견적 요청 데이터가 없습니다.</div>;
  }

  return (
    <main className='min-h-screen flex flex-col'>
      <nav className='px-6 md:px-[72px] '>
        <div className='w-full md:w-[600px] xl:w-[1400px] mx-auto'>
          <PageHeader>견적요청</PageHeader>
        </div>
      </nav>
      <section className='flex-1 bg-backgroundVariants-200 flex flex-col items-center justify-center'>
        <MovingInfo
          requestedDate={registerData.moveDate!} // 이사요청일 = 생성일 (임시)
          movingType={registerData.moveType}
          movingDate={
            new Date(
              combineDateTime(registerData.moveDate!, registerData.moveTime),
            )
          }
          departure={registerData.moveFrom.fullAddress}
          arrival={registerData.moveTo.fullAddress}
        />
        <div className='w-[271px] xl:w-[402px] mt-8'>
          <div className='text-center mb-8 text-grayscale-400 text-sm xl:text-xl'>
            <p>현재 진행 중인 이사 견적이 있어요!</p>
            <p>진행 중인 이사 완료 후 새로운 견적을 받아보세요.</p>
          </div>
          <Link href='/user/quotes/pending'>
            <CommonButton
              widthType='full'
              heightType='primary'
            >
              받은 견적 보러가기
            </CommonButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
