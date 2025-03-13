import { useState } from 'react';
import useQuoteRequestStore from '@/store/quoteRequestStore';
import RequestMessage from './RequestMessage';
import Image from 'next/image';
import cn from '@/utils/cn';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import { getStepIndex } from './QuoteRequestPage';
import { MovingStepProps } from './quoteStep.types';

const arr = [
  '소형이사 (원룸, 투룸, 20평대 미만)',
  '가정이사 (쓰리룸, 20평대 이상)',
  '사무실이사 (사무실, 상업공간)',
];

export function MovingType({
  onNext,
  onEdit,
  onExitEdit,
  step,
  maxCompletedStep,
}: MovingStepProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { registerData, setRegisterData } = useQuoteRequestStore();

  // 수정하기 버튼 클릭 시, 해당 컨테이너로 스크롤 후 onEdit 실행
  const handleEdit = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    onEdit();
  };
  // 마지막 단계가 아니면 전부 maxCompletedStep props가 필요합니다.
  if (maxCompletedStep === undefined || maxCompletedStep === null) {
    console.error('maxCompletedStep props is required');
    return null;
  }

  // 수정 완료 시, 작성한 단계로 이동하는 함수
  const handleCompleteEdit = () => {
    if (selected) {
      console.log('Updating moveType to:', selected);
      setRegisterData({ moveType: selected });
    }
    // 수정 모드라면 작성한 단계로 이동
    if (getStepIndex('이사종류') < maxCompletedStep) {
      // 수정 완료 시, 작성한 단계로 이동
      onExitEdit();
    } else {
      // 일반 next 동작
      onNext();
    }
  };

  return (
    <>
      <RequestMessage align='left'>이사 종류를 선택해 주세요.</RequestMessage>
      {step === '이사종류' ? (
        // 이사종류입력
        <div>
          <RequestMessage
            align='right'
            // 수정 취소하기 버튼이 나타나는 조건
            {...(getStepIndex('이사종류') < maxCompletedStep
              ? { onExitEdit }
              : {})}
            className='py-4 xl:py-10 px-4 xl:px-10'
          >
            <ul className='space-y-3'>
              {arr.map((item) => (
                <li
                  key={item}
                  className={cn(
                    'border border-line-200 rounded-2xl py-4 xl:py-6 px-5 xl:px-8 w-[280px] xl:w-[560px]',
                    selected === item &&
                      'bg-primary-blue-50 border-primary-blue-300',
                  )}
                  onClick={() => setSelected(item)}
                >
                  <label className='flex items-center space-x-5 cursor-pointer'>
                    <div
                      className={cn(
                        'w-6 h-6 inline-flex items-center justify-center border rounded-full',
                        selected === item
                          ? 'bg-primary-blue-300 border-primary-blue-300'
                          : 'bg-white border-gray-400',
                      )}
                    >
                      {selected === item && (
                        <Image
                          src='/icons/circle-check-box.svg'
                          alt='check'
                          width={32}
                          height={32}
                          className='w-8 h-8 object-cover'
                        />
                      )}
                    </div>
                    <span className='font-semibold'>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
            <CommonButton
              widthType={'full'}
              heightType={'primary'}
              onClick={handleCompleteEdit}
              disabled={selected ? false : true}
              backgroundColorType={selected ? 'blue' : 'gray'}
              className='mt-6'
            >
              선택완료
            </CommonButton>
          </RequestMessage>
        </div>
      ) : (
        // 이사종류요약
        <RequestMessage
          align='right'
          onEdit={handleEdit}
          color='blue'
        >
          <p>{registerData.moveType}</p>
        </RequestMessage>
      )}
    </>
  );
}
