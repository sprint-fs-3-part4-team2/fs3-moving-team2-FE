import CommonButton from '@/components/common/commonBtn/commonBtn';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  return (
    <ModalWrapper
      title='로그인이 필요합니다'
      onClose={onClose}
      className='max-w-md xl:max-w-[610px] w-full'
    >
      <div className='mt-4'>
        <p className='mt-10 mb-10'>
          이 기능을 사용하기 위해서는 로그인이 필요합니다.
        </p>
        <div className='flex gap-3 justify-end'>
          <CommonButton
            widthType='full'
            heightType='primary'
            backgroundColorType='blue'
            textColorType='white'
            onClick={onLogin}
          >
            로그인하기
          </CommonButton>
        </div>
      </div>
    </ModalWrapper>
  );
}
