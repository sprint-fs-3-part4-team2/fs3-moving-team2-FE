import Image from 'next/image';
import noQuoteImage from '@/public/img/car.svg';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import { useRouter } from 'next/navigation';

export default function NoQuoteToDisplay() {
  const router = useRouter();

  return (
    <div className='w-full flex flex-1 justify-center h-[800px] mt-[127px] md:mt-[127px] xl:mt-[194px]'>
      <div className='flex flex-col items-center gap-6 md:gap-6 xl:gap-8 w-[271px] md:w-[271px] xl:w-[402px]'>
        <Image
          src={noQuoteImage}
          alt='견적요청 없음'
          className='w-full'
        />
        <span className='text-grayscale-400 text-lg md:text-lg xl:text-2xl'>
          아직 보낸 견적이 없습니다.
        </span>
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
