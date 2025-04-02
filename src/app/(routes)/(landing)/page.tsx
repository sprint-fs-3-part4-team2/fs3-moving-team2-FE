'use client';
import Image from 'next/image';
import React, { Suspense, useEffect } from 'react';
import cn from '@/utils/cn';
import {
  LANDING_PAGE_STYLES,
  FIRST_IMAGE_BOX_STYLES,
  GRID_BOX_STYLES,
  LANDING_CARDS_COMMON_STYLES,
  LANDING_DESCRIPTION_STYLES,
  SECOND_IMAGE_BOX_STYLES,
  SECOND_IMAGE_STYLES,
  TEXT_BOX_HEAD_SUB_TITLE_STYLES,
  TEXT_BOX_HEAD_TITLE_STYLES,
  TEXT_BOX_STYLES,
  THIRD_IMAGE_BOX_STYLES,
  THIRD_IMAGE_STYLES,
} from './constant';
import { useToaster } from '@/hooks/useToaster';
import { useSearchParams, useParams } from 'next/navigation';
import { UserType } from '@/components/authPage/common.types';

export default function Home(): JSX.Element {
  return (
    <div className={cn(LANDING_PAGE_STYLES)}>
      {/* <Suspense>
        <Sus />
      </Suspense> */}
      <h1 className={cn(LANDING_DESCRIPTION_STYLES)}>
        원하는 이사 서비스를 요청하고 견적을 받아보세요
      </h1>

      {/* Main Grid */}
      <div className={cn(GRID_BOX_STYLES)}>
        {/* 세로 박스 */}

        <div
          className={cn(
            LANDING_CARDS_COMMON_STYLES,
            'w-[327px] h-[240px] xxl:w-[432px] xxl:h-[589px] xxl:col-span-1 xxl:row-span-2 bg-primary-blue-100)',
          )}
        >
          {/* Text Box */}
          <div className={cn(TEXT_BOX_STYLES)}>
            <h2 className={cn(TEXT_BOX_HEAD_TITLE_STYLES)}>소형이사</h2>
            <h3 className={cn(TEXT_BOX_HEAD_SUB_TITLE_STYLES)}>
              원룸, 투룸, 20평대 미만
            </h3>
          </div>

          <div className={cn(FIRST_IMAGE_BOX_STYLES)}>
            <Image
              fill
              src='/img/landing/lundury-img.svg'
              alt='소형이사 이미지'
              className='object-cover'
            />
          </div>
        </div>

        {/* 가로 박스1 */}
        <div
          className={cn(
            LANDING_CARDS_COMMON_STYLES,
            'xxl:col-span-2 rounded-[32px] bg-background',
          )}
        >
          {/* Text Box */}
          <div className={cn(TEXT_BOX_STYLES)}>
            <h2 className={cn(TEXT_BOX_HEAD_TITLE_STYLES)}>가정이사</h2>
            <h3 className={cn(TEXT_BOX_HEAD_SUB_TITLE_STYLES)}>
              쓰리룸, 20평대 미만
            </h3>
          </div>

          <div className={cn(SECOND_IMAGE_BOX_STYLES)}>
            <Image
              fill
              src='/img/landing/car-img.svg'
              alt='가정이사 이미지'
              className={cn(SECOND_IMAGE_STYLES)}
            />
          </div>
        </div>

        {/* 가로 박스2 */}
        <div
          className={cn(
            LANDING_CARDS_COMMON_STYLES,
            'xxl:col-span-2 rounded-[32px] bg-background',
          )}
        >
          {/* Text Box */}
          <div className={cn(TEXT_BOX_STYLES)}>
            <h2 className={cn(TEXT_BOX_HEAD_TITLE_STYLES)}>
              기업, 사무실 이사
            </h2>
            <h3 className={cn(TEXT_BOX_HEAD_SUB_TITLE_STYLES)}>
              사무실, 상업공간
            </h3>
          </div>

          <div className={cn(THIRD_IMAGE_BOX_STYLES)}>
            <Image
              fill
              src='/img/landing/building-img.svg'
              alt='기업, 사무실 이사 이미지'
              className={cn(THIRD_IMAGE_STYLES)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// function Sus() {
//   const searchParams = useSearchParams();
//   const params = useParams();
//   const toaster = useToaster();
//   useEffect(() => {
//     const noAuth = searchParams.get('auth') === 'no';
//     const userType = searchParams.get('type') as UserType | 'nouser';
//     if (noAuth && !!userType) toaster('warn', '권한이 없습니다.');
//   }, [params]);
//   return <div className='toaterController'></div>;
// }
