'use client';

import Image from 'next/image';
import noQuoteImage from '@/public/img/car.svg';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import { useRouter } from 'next/navigation';
import NoQuoteRequestText from '../../atoms/noQuoteRequestText';

export default function NoQuoteRequest() {
  const router = useRouter();

  return (
    <div className='w-full flex flex-1 items-center justify-center my-auto h-full mt-[127px] md:mt-[127px] xl:mt-[194px]'>
      <div className='flex flex-col items-center gap-6 md:gap-6 xl:gap-8 w-[271px] md:w-[271px] xl:w-[402px]'>
        <Image
          src={noQuoteImage}
          alt='견적요청 없음'
          className='w-full'
        />
        <NoQuoteRequestText />
        <CommonButton
          widthType='dynamic'
          heightType='primary'
          className='px-6 py-[14px] md:py-[14px] xl:py-4'
          onClick={() => router.push('/user/quotes/request')}
        >
          견적 요청 하러가기
        </CommonButton>
      </div>
    </div>
  );
}
