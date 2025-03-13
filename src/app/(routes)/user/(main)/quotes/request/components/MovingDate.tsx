import { useRef, useState } from 'react';
import useQuoteRequestStore from '@/store/quoteRequestStore';
import RequestMessage from './RequestMessage';
import { Calendar } from '@/components/ui/calendar';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import { ko } from 'date-fns/locale';
import formatKoreanDate from '@/utils/formatKoreanDate';
import { getStepIndex } from './QuoteRequestPage';
import { MovingStepProps } from '../movingStep.types';

export function MovingDate({
  onNext,
  onEdit,
  onExitEdit,
  step,
  maxCompletedStep,
}: MovingStepProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { registerData, setRegisterData } = useQuoteRequestStore();
  const containerRef = useRef<HTMLDivElement>(null);

  if (step === undefined) {
    console.error('step props is required');
    return null;
  }

  if (maxCompletedStep === undefined || maxCompletedStep === null) {
    console.error('maxCompletedStep props is required');
    return null;
  }

  // 수정 완료 시, 작성한 단계로 이동하는 함수
  const handleCompleteEdit = () => {
    if (date) {
      console.log('Updating moveDate to:', date);
      setRegisterData({
        moveDate: date ? new Date(date) : null,
      });
    }
    // 수정 모드라면 작성한 단계로 이동
    if (getStepIndex('이사예정일') < maxCompletedStep) {
      // 수정 완료 시, 작성한 단계로 이동
      onExitEdit();
    } else {
      // 일반 next 동작
      onNext();
    }
  };

  // 수정하기 버튼 클릭 시, 해당 컨테이너로 스크롤 후 onEdit 실행
  const handleEdit = () => {
    if (containerRef.current) {
      window.scrollTo({ top: 290, behavior: 'smooth' });
    }
    onEdit();
  };

  // 작성한 단계가 아니면 수정하기 버튼을 보여줌
  const messageProps =
    getStepIndex('이사예정일') !== maxCompletedStep
      ? { onEdit: handleEdit }
      : {};

  return (
    <div ref={containerRef}>
      <RequestMessage align='left'>이사 예정일을 선택해 주세요.</RequestMessage>
      {
        // 이사예정일입력
        step === '이사예정일' ? (
          <div>
            <RequestMessage
              align='right'
              {...(getStepIndex('이사예정일') < maxCompletedStep
                ? { onExitEdit }
                : {})}
              className='px-6'
            >
              <Calendar
                disabled={{ before: new Date() }}
                mode='single'
                selected={date}
                locale={ko}
                onSelect={setDate}
                classNames={{
                  cell: 'h-9 w-9 xl:h-12 xl:w-12',
                  day: 'h-9 w-9 xl:h-12 xl:w-12 p-0 font-normal aria-selected:opacity-100 rounded-full',
                  head_cell:
                    'w-9  xl:w-12 text-muted-foreground rounded-md font-normal xl:text-2lg',
                }}
              />
              <CommonButton
                widthType={'full'}
                heightType={'primary'}
                onClick={handleCompleteEdit}
                disabled={date ? false : true}
                backgroundColorType={date ? 'blue' : 'gray'}
                className='mt-6'
              >
                선택완료
              </CommonButton>
            </RequestMessage>
          </div>
        ) : (
          // 이사예정일요약
          <RequestMessage
            align='right'
            color='blue'
            // 작성단계에서 다른
            // 수정하기 버튼이 나타나는 조건(작성한 단계 안보여줌)
            {...messageProps}
          >
            {/* 수정하고 수정 취소해도 선택된게 아닌, 기존 정보를 보여주도록함 */}
            <p>
              {registerData.moveDate
                ? formatKoreanDate(registerData.moveDate)
                : null}
            </p>
          </RequestMessage>
        )
      }
    </div>
  );
}
