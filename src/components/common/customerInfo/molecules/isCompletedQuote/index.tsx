'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import { IsCompletedQuoteProps } from './isCompletedQuote.types';
import { useRouter } from 'next/navigation';
import { COVER_CONTAINER_STYLE, COVER_SPAN_STYLE } from '../constants';

export default function IsCompletedQuote({ quoteId }: IsCompletedQuoteProps) {
  const router = useRouter();

  return (
    <div className={COVER_CONTAINER_STYLE}>
      <div className='flex flex-col gap-4'>
        <span className={COVER_SPAN_STYLE}>이사 완료된 견적이에요</span>
        <CommonButton
          widthType='dynamic'
          heightType='primary'
          className='bg-primary-blue-100 border border-primary-blue-200 text-primary-blue-300 text-[14px] md:text-[14px] xl:text-[16px]'
          onClick={() => router.push(`/mover/quotes/${quoteId}`)}
        >
          견적 상세보기
        </CommonButton>
      </div>
    </div>
  );
}
