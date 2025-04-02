'use client';
import Image from 'next/image';
import moving from '@/public/img/no-review.svg';
import { useEffect, useState } from 'react';
import { useToaster } from '@/hooks/useToaster';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const toaster = useToaster();
  const router = useRouter();
  const [sec, setSec] = useState(6);
  useEffect(() => {
    setTimeout(() => {
      const interval = setInterval(() => {
        setSec((prev) => {
          if (prev > 1) {
            toaster('info', `${prev - 1}초 뒤에 홈으로 이동합니다.`, 1000);
            return prev - 1;
          } else {
            // router.replace('/');
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }, 3000);
  }, []);

  return (
    <div className='relative overflow-hidden w-full h-screen flex items-center justify-center'>
      <div className='absolute w-full xl:w-auto top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
        <Image
          className={''}
          src={moving}
          alt='무빙 트럭'
        />
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-3xl text-center font-bold mt-8 break-keep w-full'>
            <span className='text-6xl mr-4'>
              4<b className='text-primary-blue-200'>0</b>4
            </span>
            페이지를 찾을 수 없습니다.
          </h1>
          <p className='text-grayscale-300 text-center text-2xl xl:text-xl mt-6 break-keep'>
            존재하지 않는 페이지입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
