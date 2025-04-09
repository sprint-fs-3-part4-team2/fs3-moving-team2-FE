'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { StepType } from './quoteStep.types';
import { MovingType } from './MovingType';
import { MovingDate } from './MovingDate';
import { MovingTime } from './MovingTime';
import { MovingRegion } from './MovingRegion';
import { QuoteConfirmationModal } from './QuoteConfirmationModal';
import QuoteRequestHeader from './QuoteRequestHeader';
import IntroMessage from './IntroMessage';

const steps = ['이사종류', '이사예정일', '이사예정시간', '이사지역'] as const;
type stepType = (typeof steps)[number];

export const getStepIndex = (step: stepType) => steps.indexOf(step); // 스텝의 인덱스를 반환하는 함수
export const maxStep = steps.length;

export default function QuoteRequestPage() {
  const [step, setStep] = useState<StepType>('이사종류');
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(0); // 완료된 단계 중 가장 높은 인덱스
  const [showModal, setShowModal] = useState(false); // 견적 확정 모달
  const innerScrollRef = useRef<HTMLDivElement>(null); // 내부 스크롤을 위한 ref
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false); // "다음" 동작 시 전체 하단 스크롤을 할지 결정하는 플래그

  // 다음 단계로 이동하는 함수
  const handleNextStep = (nextStep: StepType) => {
    setShouldScrollToBottom(true); // 다음 스텝(혹은 수정 취소/완료) 시 호출 – 하단 스크롤 활성화
    const nextStepIndex = getStepIndex(nextStep);
    setStep(nextStep);
    // 완료된 작성 단계 중 가장 높은 인덱스를 업데이트합니다.
    if (nextStepIndex > maxCompletedStep) {
      setMaxCompletedStep(nextStepIndex);
    }
  };

  // 스텝이 변경, 수정 취소될 때마다 하단으로 스크롤
  useLayoutEffect(() => {
    if (shouldScrollToBottom) {
      const element = innerScrollRef.current;
      if (element) {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [step, maxCompletedStep, shouldScrollToBottom]);

  // 자식의 위치를 기준으로 스크롤하는 함수
  const scrollToChild = (childElement: HTMLDivElement) => {
    if (innerScrollRef.current) {
      // 자식 요소의 offsetTop을 가져와서 100px 정도 여유를 둡니다.
      const offset = childElement.offsetTop;
      innerScrollRef.current.scrollTo({
        top: offset - 250,
        behavior: 'smooth',
      });
    }
  };

  return (
    // 질문이 적을 경우 화면 전체를 채우기 위해 min-h-screen 추가
    <main className='min-h-[calc(100vh-55px)]  xl:min-h-[calc(100vh-89px)] flex flex-col'>
      {/* 견적 요청 헤더 */}
      <QuoteRequestHeader
        progress={(maxCompletedStep / maxStep) * 100}
        title='견적 요청'
      />

      {/* 견적 질문 내용 */}
      <article
        ref={innerScrollRef}
        className='flex-1 overflow-auto bg-backgroundVariants-200 px-6 py-5'
      >
        <div className='max-w-[327px] xl:max-w-[1400px] mx-auto'>
          <IntroMessage />
          {/* 단계별로 컴포넌트 차례 차례보여주기 */}
          <section
            aria-live='polite'
            className='quote-steps'
          >
            {getStepIndex('이사종류') <= maxCompletedStep && (
              <MovingType
                onNext={() => handleNextStep('이사예정일')}
                onEdit={() => {
                  handleNextStep('이사종류');
                  setShouldScrollToBottom(false); // 수정하기 클릭 시, 하단 스크롤 비활성화
                }}
                onExitEdit={() => handleNextStep(steps[maxCompletedStep])} // 수정 종료 =수정 취소시, 혹은 수정 완료시, 작성된 단계로 이동
                step={step}
                maxCompletedStep={maxCompletedStep}
                scrollToChild={scrollToChild} // 자식 요소로 스크롤하는 함수 전달
              />
            )}
            {getStepIndex('이사예정일') <= maxCompletedStep && (
              <MovingDate
                onNext={() => handleNextStep('이사예정시간')}
                onEdit={() => {
                  handleNextStep('이사예정일');
                  setShouldScrollToBottom(false);
                }}
                onExitEdit={() => handleNextStep(steps[maxCompletedStep])}
                step={step}
                maxCompletedStep={maxCompletedStep}
                scrollToChild={scrollToChild}
              />
            )}
            {getStepIndex('이사예정시간') <= maxCompletedStep && (
              <MovingTime
                onNext={() => handleNextStep('이사지역')}
                onEdit={() => {
                  handleNextStep('이사예정시간');
                  setShouldScrollToBottom(false);
                }}
                onExitEdit={() => handleNextStep(steps[maxCompletedStep])}
                step={step}
                maxCompletedStep={maxCompletedStep}
                scrollToChild={scrollToChild}
              />
            )}
            {getStepIndex('이사지역') <= maxCompletedStep && (
              <MovingRegion setShowModal={setShowModal} />
            )}
          </section>
          {showModal && (
            <QuoteConfirmationModal
              setShowModal={setShowModal}
              setMaxCompletedStep={() => {
                setMaxCompletedStep(maxStep);
              }}
            />
          )}
        </div>
      </article>
    </main>
  );
}
