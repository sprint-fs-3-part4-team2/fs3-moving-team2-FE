import ModalWrapper from '@/components/modal/ModalWrapper';
import CommonButton from '@/components/common/commonBtn/commonBtn';

interface MoverDetailModalsProps {
  showLoginModal: boolean;
  showGeneralQuoteModal: boolean;
  showSpecificQuoteModal: boolean;
  showProfileModal: boolean;
  moverName: string;
  onCloseLoginModal: () => void;
  onCloseGeneralQuoteModal: () => void;
  onCloseSpecificQuoteModal: () => void;
  onCloseProfileModal: () => void;
  onLogin: () => void;
  onGeneralQuote: () => void;
  onSpecificQuote: () => void;
  onProfile: () => void;
}

export default function MoverDetailModals({
  showLoginModal,
  showGeneralQuoteModal,
  showSpecificQuoteModal,
  showProfileModal,
  moverName,
  onCloseLoginModal,
  onCloseGeneralQuoteModal,
  onCloseSpecificQuoteModal,
  onCloseProfileModal,
  onLogin,
  onGeneralQuote,
  onSpecificQuote,
  onProfile,
}: MoverDetailModalsProps) {
  return (
    <>
      {/* 로그인 모달 */}
      {showLoginModal && (
        <ModalWrapper
          title='로그인이 필요합니다'
          onClose={onCloseLoginModal}
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
      )}

      {/* 프로필 등록 모달 */}
      {showProfileModal && (
        <ModalWrapper
          title='프로필 등록이 필요합니다'
          onClose={onCloseProfileModal}
          className='max-w-md xl:max-w-[610px] w-full'
        >
          <div className='mt-4'>
            <p className='mt-10 mb-10'>
              이 기능을 사용하기 위해서는 프로필 등록이 필요합니다.
            </p>
            <div className='flex gap-3 justify-end'>
              <CommonButton
                widthType='full'
                heightType='primary'
                backgroundColorType='blue'
                textColorType='white'
                onClick={onProfile}
              >
                프로필 등록하기
              </CommonButton>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 일반 견적 요청 필요 모달 */}
      {showGeneralQuoteModal && (
        <ModalWrapper
          title='지정 견적 요청하기'
          onClose={onCloseGeneralQuoteModal}
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
                onClick={onGeneralQuote}
              >
                일반 견적 요청하기
              </CommonButton>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* 지정 견적 요청 모달 */}
      {showSpecificQuoteModal && (
        <ModalWrapper
          title='지정 견적 요청하기'
          onClose={onCloseSpecificQuoteModal}
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
                onClick={onSpecificQuote}
              >
                지정 견적 요청하기
              </CommonButton>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
}
