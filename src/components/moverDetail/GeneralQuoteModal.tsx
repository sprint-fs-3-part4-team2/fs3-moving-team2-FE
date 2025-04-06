import CommonButton from '@/components/common/commonBtn/commonBtn';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface GeneralQuoteModalProps {
  onClose: () => void;
  onRequest: () => void;
}

export default function GeneralQuoteModal({
  onClose,
  onRequest,
}: GeneralQuoteModalProps) {
  return (
    <ModalWrapper
      title='지정 견적 요청하기'
      onClose={onClose}
      className='max-w-md xl:max-w-[610px] w-full'
    >
      <div className='mt-4'>
        <p className='mt-10 mb-10'>일반 견적 요청을 먼저 진행해 주세요.</p>
        <div className='flex justify-center'>
          <CommonButton
            widthType='full'
            heightType='primary'
            backgroundColorType='blue'
            textColorType='white'
            onClick={onRequest}
          >
            일반 견적 요청하기
          </CommonButton>
        </div>
      </div>
    </ModalWrapper>
  );
}
