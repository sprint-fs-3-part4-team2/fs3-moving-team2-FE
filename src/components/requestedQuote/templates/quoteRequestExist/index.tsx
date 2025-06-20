'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import { MovingInfoProps } from '@/components/common/movingInfo/organisms/movingInfo/movingInfo.types';
import ModalWrapper from '@/components/modal/ModalWrapper';
import CancelRequestModalContent from '../../molecules/cancelRequestModalContent';
import { useHandleModalOpen } from '@/hooks/useHandleModalOpen';
import { memo } from 'react';

const MemoizedMovingInfo = memo(MovingInfo);

export default function QuoteRequestExist(
  props: MovingInfoProps & { id: string; status: string },
) {
  const { modalOpen, openModal, closeModal } = useHandleModalOpen();
  const quoteConfirmed =
    props.status !== 'QUOTE_REQUESTED' && props.status !== 'MOVER_SUBMITTED';

  return (
    <div className='relative flex flex-col mx-auto w-full items-center overflow-auto pb-24'>
      {modalOpen && (
        <ModalWrapper
          title='견적 요청 취소하기'
          onClose={closeModal}
          className='xl:w-[608px]'
        >
          <CancelRequestModalContent
            onClose={closeModal}
            requestId={props.id}
          />
        </ModalWrapper>
      )}
      <div className='w-full max-w-[1400px] px-6 md:px-[72.5px] xl:px-0 flex justify-between gap-[127px] mt-8 md:mt-8 xl:mt-10'>
        <div className='w-full'>
          <MemoizedMovingInfo {...props} />
        </div>
        <div className='w-[328px] hidden md:hidden xl:block'>
          <CommonButton
            widthType='full'
            heightType='primary'
            onClick={openModal}
            disabled={quoteConfirmed}
          >
            {quoteConfirmed ? '이미 확정된 견적입니다' : '견적 취소하기'}
          </CommonButton>
        </div>
      </div>
      <div className='fixed md:fixed xl:hidden bottom-0 left-0 right-0 w-full px-6 md:px-[72px] max-w-[1400px] mx-auto py-[10px] border-t border-t-gray-50 bg-white'>
        <CommonButton
          widthType='full'
          heightType='primary'
          onClick={openModal}
        >
          견적 취소하기
        </CommonButton>
      </div>
    </div>
  );
}
