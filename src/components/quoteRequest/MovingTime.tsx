import { forwardRef, useState } from 'react';
import useQuoteRequestStore from '@/store/quoteRequestStore';
import RequestMessage from './RequestMessage';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import formatKoreanTime from '@/utils/formatKoreanTime';
import { getStepIndex } from './QuoteRequestPage';
import TimePicker from './TimePicker';
import { MovingStepProps } from './quoteStep.types';

export const MovingTime = forwardRef<HTMLDivElement, MovingStepProps>(
  ({ onNext, onEdit, onExitEdit, step, maxCompletedStep }, ref) => {
    const [date, setDate] = useState<string | null>(null);
    const { registerData, setRegisterData } = useQuoteRequestStore();
    const [isSubmitted, setIsSubmitted] = useState(false); // 수정 완료 시, 애니메이션 효과를 위해

    const containerRef = ref as React.MutableRefObject<HTMLDivElement | null>;

    if (maxCompletedStep === undefined || maxCompletedStep === null) {
      console.error('maxCompletedStep props is required');
      return null;
    }

    // 수정 완료 시, 작성한 단계로 이동하는 함수
    const handleCompleteEdit = () => {
      if (date) {
        console.log('Updating moveType to:', date);
        setRegisterData({ moveTime: date });
      }
      setIsSubmitted(true);
      // 수정 모드라면 작성한 단계로 이동
      if (getStepIndex('이사예정시간') < maxCompletedStep) {
        // 수정 완료 시, 작성한 단계로 이동
        onExitEdit();
      } else {
        // 일반 next 동작
        // 0.4초 후에 onNext 실행(애니메이션 효과를 위해)
        setTimeout(() => {
          onNext();
        }, 400);
      }
    };

    const handleEdit = () => {
      containerRef?.current?.scrollTo({ top: 470, behavior: 'smooth' });
      setIsSubmitted(false);
      onEdit();
    };

    return (
      <div ref={ref}>
        <div
          className='animate-slideUp'
          style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
        >
          <RequestMessage align='left'>
            이사 예정시간을 선택해 주세요.
          </RequestMessage>
        </div>
        {step === '이사예정시간' ? (
          <div
            className={`${isSubmitted ? 'animate-slideDownFade' : 'animate-slideUp'}`}
            style={{
              animationDelay: isSubmitted ? '0s' : '0.5s',
              animationFillMode: isSubmitted ? 'none' : 'backwards',
            }}
          >
            <RequestMessage
              align='right'
              {...(getStepIndex('이사예정시간') < maxCompletedStep
                ? { onExitEdit }
                : {})}
            >
              <TimePicker
                value={date || ''}
                onChange={(e) => setDate(e.target.value)}
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
          <div className='animate-slideUp'>
            <RequestMessage
              align='right'
              {...(getStepIndex('이사예정시간') !== maxCompletedStep
                ? { onEdit: handleEdit }
                : {})}
              color='blue'
            >
              <p>
                {registerData.moveTime
                  ? formatKoreanTime(registerData.moveTime)
                  : date}
              </p>
            </RequestMessage>
          </div>
        )}
      </div>
    );
  },
);

MovingTime.displayName = 'MovingTime';
