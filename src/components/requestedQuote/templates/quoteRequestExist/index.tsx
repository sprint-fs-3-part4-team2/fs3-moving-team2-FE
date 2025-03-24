'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import { MovingInfoProps } from '@/components/common/movingInfo/organisms/movingInfo/movingInfo.types';
import ModalWrapper from '@/components/modal/ModalWrapper';
import CancelRequestModalContent from '../../molecules/cancelRequestModalContent';
import { useHandleModalOpen } from '@/hooks/useHandleModalOpen';

export default function QuoteRequestExist(
  props: MovingInfoProps & { id: string },
) {
  const { modalOpen, openModal, closeModal } = useHandleModalOpen();

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
            requestId='abc'
          />
        </ModalWrapper>
      )}
      <div className='w-full max-w-[1400px] px-6 md:px-[72.5px] xl:px-0 flex justify-between gap-[127px] mt-8 md:mt-8 xl:mt-10'>
        <div className='w-full'>
          <MovingInfo {...props} />
        </div>
        <div className='w-[328px] hidden md:hidden xl:block'>
          <CommonButton
            widthType='full'
            heightType='primary'
            onClick={openModal}
          >
            견적 취소하기
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
