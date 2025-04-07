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
  const [start, setStart] = useState(false);

  useEffect(() => {
    const waitTimer = setTimeout(() => {
      setStart(true);
    }, 3000);

    return () => clearTimeout(waitTimer);
  }, []);

  useEffect(() => {
    if (!start) return;
    const timer = setTimeout(() => {
      if (sec > 1) {
        toaster('info', `${sec - 1}초 뒤에 홈으로 이동합니다.`, 1000);
      }
      setSec((prev) => prev - 1);
    }, 1000);
    if (sec === 0) {
      router.replace('/');
    }
    return () => clearTimeout(timer);
  }, [sec, start]);

  return (
    <div className='relative overflow-hidden w-full h-screen flex items-center justify-center'>
      <div className='absolute w-full xl:w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
        {/*         <Image
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
        </div> */}
        <div className='group relative w-[214px] md:w-[321px] xl:w-[428px] h-[240.4px] md:h-[360.6px] xl:h-[480.8px]'>
          <Image
            src='/img/no-data/404.png'
            alt='not_found'
            fill
            priority
            style={{ objectFit: 'cover' }}
            className='block group-hover:hidden'
          />
          <Image
            src='/img/no-data/404_empty.png'
            alt='not_found_hover'
            fill
            priority
            style={{ objectFit: 'cover' }}
            className='hidden group-hover:block'
          />
        </div>
        <div className='pt-[24px] xl:pt-[32px] text-grayscale-400 text-[16px] xl:text-[24px]'>
          존재하지 않는 페이지입니다
        </div>
      </div>
    </div>
  );
}
