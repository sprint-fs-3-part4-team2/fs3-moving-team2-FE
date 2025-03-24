import ModalWrapper from '@/components/modal/ModalWrapper';
import useQuoteRequestStore from '@/store/quoteRequestStore';
import combineDateTime from '@/utils/combineDateTime';
import formatKoreanDate from '@/utils/formatKoreanDate';
import { maxStep } from './QuoteRequestPage';
import formatKoreanTime from '@/utils/formatKoreanTime';
import { createQuoteRequest } from '@/services/moverQuotes';

interface QuoteConfirmationModalProps {
  setShowModal: (value: boolean) => void;
  setMaxCompletedStep: (value: number) => void;
}

export function QuoteConfirmationModal({
  setShowModal,
  setMaxCompletedStep,
}: QuoteConfirmationModalProps) {
  const { registerData } = useQuoteRequestStore();

  // 소형이사 (원룸, 투룸, 20평대 미만) -> 소형이사
  const koreanMoveType = registerData.moveType.split('(')[0].trim() as
    | '소형이사'
    | '사무실이사'
    | '가정이사';

  const handleFinalConfirm = async () => {
    setMaxCompletedStep(maxStep);
    // 최종 견적 제출을 위한 처리 (예: 백엔드 API 호출)
    const payload = {
      moveType: koreanMoveType,
      moveDate: combineDateTime(registerData.moveDate!, registerData.moveTime),
      departure: registerData.moveFrom,
      arrival: registerData.moveTo,
    };

    console.log('최종 견적 요청 제출:', payload);

    await createQuoteRequest(payload);
    setShowModal(false);
  };

  return (
    <ModalWrapper
      title='최종 견적 요청 확인해주세요'
      onClose={() => setShowModal(false)}
    >
      <div className='mt-4'>
        <p className='mb-2'>견적에 대한 정보:</p>
        <pre className='bg-gray-100 p-2 text-sm'>
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
        </pre>

        <p className='mt-4 text-sm text-red-500'>
          주의: 견적은 수정을 못하니 잘못 적지 않았는지 확인 부탁드립니다!
        </p>
      </div>
      <div className='mt-6'>
        <button
          onClick={handleFinalConfirm}
          className='w-full py-2 bg-blue-500 text-white rounded-lg'
        >
          견적 요청하기
        </button>
      </div>
    </ModalWrapper>
  );
}
