'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import { ConfirmQuoteModalContentProps } from './confirmQuoteModalContent.types';
import { UseConfirmQuoteMutation } from '../../../hooks/useConfirmQuoteMutation';

export default function ConfirmQuoteModalContent({
  onClose,
  moverQuoteId,
}: ConfirmQuoteModalContentProps) {
  const mutation = UseConfirmQuoteMutation(moverQuoteId, onClose);

  return (
    <div className='flex flex-col w-full gap-6 md:gap-6 xl:gap-10 mt-6 md:mt-6 xl:mt-10'>
      <span>견적을 확정하시겠습니까?</span>
      <div className='flex w-full gap-2 md:gap-2 xl:gap-[11px]'>
        <CommonButton
          widthType='half'
          heightType='primary'
          onClick={onClose}
          backgroundColorType='white'
          borderColorsType='blue'
          textColorType='blue'
        >
          취소
        </CommonButton>
        <CommonButton
          widthType='half'
          heightType='primary'
          onClick={() => mutation.mutate()}
        >
          확인
        </CommonButton>
      </div>
    </div>
  );
}
