import ModalWrapper from '@/components/modal/ModalWrapper';
import useQuoteRequestStore from '@/store/quoteRequestStore';
import combineDateTime from '@/utils/combineDateTime';
import { maxStep } from './QuoteRequestPage';
import { useCreateQuoteRequestMutation } from '@/hooks/useCreateQuoteRequestMutation';
import { useRouter } from 'next/navigation';
import formatKoreanDate from '@/utils/formatKoreanDate';
import formatKoreanTime from '@/utils/formatKoreanTime';
import MovingInfo from '../common/movingInfo/organisms/movingInfo';

interface QuoteConfirmationModalProps {
  setShowModal: (value: boolean) => void;
  setMaxCompletedStep: (value: number) => void;
}

export function QuoteConfirmationModal({
  setShowModal,
  setMaxCompletedStep,
}: QuoteConfirmationModalProps) {
  const { registerData } = useQuoteRequestStore();
  const createMutation = useCreateQuoteRequestMutation(() =>
    setShowModal(false),
  );

  const router = useRouter();

  // 소형이사 (원룸, 투룸, 20평대 미만) -> 소형이사
  const koreanMoveType = registerData.moveType.split('(')[0].trim() as
    | '소형이사'
    | '사무실이사'
    | '가정이사';

  const handleFinalConfirm = () => {
    setMaxCompletedStep(maxStep);
    // 최종 견적 제출을 위한 처리 (예: 백엔드 API 호출)
    const payload = {
      moveType: koreanMoveType,
      moveDate: combineDateTime(registerData.moveDate!, registerData.moveTime),
      departure: registerData.moveFrom,
      arrival: registerData.moveTo,
    };

    console.log('최종 견적 요청 제출:', payload);

    createMutation.mutate(payload);

    setTimeout(() => {
      router.push('/user/quotes/requested');
    }, 300);
  };

  return (
    <ModalWrapper
      title='최종 견적 요청 확인해주세요'
      onClose={() => setShowModal(false)}
    >
      <div className='mt-4'>
        {/* <p className='mb-2'>견적에 대한 정보:</p> */}
        {/* <pre className='bg-gray-100 p-2 text-sm'>
          {JSON.stringify(
            {
              이사종류: registerData.moveType,
              이사예정일: formatKoreanDate(registerData.moveDate!),
              이사예정시간: formatKoreanTime(registerData.moveTime),
              '이사지역 출발지': registerData.moveFrom,
              '이사지역 도착지': registerData.moveTo,
            },
            null,
            2,
          )}
        </pre> */}
        <MovingInfo
          requestedDate={registerData.moveDate!} // 이사요청일 = 생성일 (임시)
          movingType={registerData.moveType}
          movingDate={
            new Date(
              combineDateTime(registerData.moveDate!, registerData.moveTime),
            )
          }
          departure={registerData.moveFrom.fullAddress}
          arrival={registerData.moveTo.fullAddress}
        />

        <p className='mt-4 text-xl text-red-500 font-semibold'>
          주의: 견적은 수정을 못하니 잘못 적지 않았는지 확인 부탁드립니다!
        </p>
      </div>
      <div className='mt-6'>
        <button
          onClick={handleFinalConfirm}
          className='w-full py-4 text-xl bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition duration-200'
        >
          견적 요청하기
        </button>
      </div>
    </ModalWrapper>
  );
}
