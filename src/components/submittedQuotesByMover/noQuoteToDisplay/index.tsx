import CommonButton from '@/components/common/commonBtn/commonBtn';
import { useRouter } from 'next/navigation';
import NoData from '@/components/noData/NoData';

export default function NoQuoteToDisplay() {
  const router = useRouter();

  return (
    <div className='w-full flex flex-1 justify-center h-[800px] mt-[127px] md:mt-[127px] xl:mt-[150px]'>
      <div className='flex flex-col items-center gap-6 md:gap-6 xl:gap-8 w-[271px] md:w-[271px] xl:w-[402px]'>
        <NoData text='보낸 견적이 없어요' />
        <CommonButton
          widthType='dynamic'
          heightType='primary'
          className='px-6 py-[14px] md:py-[14px] xl:py-4'
          onClick={() => router.push('/mover/quotes/requested')}
        >
          견적 보내러 가기
        </CommonButton>
      </div>
    </div>
  );
}
