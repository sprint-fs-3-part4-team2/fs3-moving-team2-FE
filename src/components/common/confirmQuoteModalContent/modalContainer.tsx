import CommonButton from '@/components/common/commonBtn/commonBtn';
import ConfirmQuoteModalContent from '@/components/common/confirmQuoteModalContent';
import ModalWrapper from '@/components/modal/ModalWrapper';
import { useHandleModalOpen } from '@/hooks/useHandleModalOpen';

export default function ModalContainer({ id }: { id: string }) {
  const { openModal, closeModal, modalOpen } = useHandleModalOpen();

  return (
    <>
      <CommonButton
        widthType='full'
        heightType='primary'
        backgroundColorType='blue'
        textColorType='white'
        onClick={openModal}
      >
        견적 확정하기
      </CommonButton>
      {modalOpen && (
        <ModalWrapper
          title='견적 확정하기'
          onClose={closeModal}
          className='xl:w-[608px]'
        >
          <ConfirmQuoteModalContent
            onClose={closeModal}
            moverQuoteId={id}
          />
        </ModalWrapper>
      )}
    </>
  );
}
