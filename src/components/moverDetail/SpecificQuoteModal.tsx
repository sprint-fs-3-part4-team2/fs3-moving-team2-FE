import CommonButton from '@/components/common/commonBtn/commonBtn';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface SpecificQuoteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  moverName: string;
}

export default function SpecificQuoteModal({
  onClose,
  onConfirm,
  moverName,
}: SpecificQuoteModalProps) {
  return (
    <ModalWrapper
      title='지정 견적 요청하기'
      onClose={onClose}
      className='max-w-md xl:max-w-[610px] w-full'
    >
      <div className='mt-4'>
        <p className='mb-10'>
          {moverName} 기사님에게 지정 견적을 요청하시겠습니까?
        </p>
        <div className='flex justify-center'>
          <CommonButton
            widthType='full'
            heightType='primary'
            backgroundColorType='blue'
            textColorType='white'
            onClick={onConfirm}
          >
            지정 견적 요청하기
          </CommonButton>
        </div>
      </div>
    </ModalWrapper>
  );
}
