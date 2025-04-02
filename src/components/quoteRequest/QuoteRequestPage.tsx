'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { StepType } from './quoteStep.types';
import RequestMessage from './RequestMessage';
import { MovingType } from './MovingType';
import { MovingDate } from './MovingDate';
import { MovingTime } from './MovingTime';
import { MovingRegion } from './MovingRegion';
import { QuoteConfirmationModal } from './QuoteConfirmationModal';

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
    <div className='min-h-[calc(100vh-55px)]  xl:min-h-[calc(100vh-89px)] flex flex-col'>
      {/* 견적요청 container */}
      <div className='sticky bg-white px-6 flex items-center h-[96px] xl:h-32 top-[54px] xl:top-[89px] left-0 right-0 z-10'>
        {/* 견적 요청 div */}
        <div className='flex flex-col justify-between flex-1 max-w-[327px] xl:max-w-[1400px] mx-auto h-12 xl:h-16 bg-grayscale-50'>
          <h1 className='font-semibold text-2lg xl:text-2xl'>견적 요청</h1>
          <div className='w-full bg-line-200 rounded-full h-1.5 xl:h-2 mb-2'>
            <div
              className={
                'bg-blue-500 h-1.5 xl:h-2 rounded-full transition-all duration-500 ease-in-out'
              }
              style={{
                width: `${(maxCompletedStep / maxStep) * 100}%`,
              }}
            ></div>
          </div>
          {/* 테스트 코드 */}
          {/* <p>
            {getStepIndex(step) + 1} / {maxStep}
          </p>
          <h2>현재 스텝: {step}</h2> */}
        </div>
      </div>

      {/* 견적 질문 내용 */}
      <section
        ref={innerScrollRef}
        className='flex-1 overflow-auto bg-backgroundVariants-200 px-6 py-5'
      >
        <div className='max-w-[327px] xl:max-w-[1400px] mx-auto'>
          <RequestMessage align='left'>
            몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)
          </RequestMessage>
          {/* 단계별로 컴포넌트 차례 차례보여주기 */}
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
          {showModal && (
            <QuoteConfirmationModal
              setShowModal={setShowModal}
              setMaxCompletedStep={() => {
                setMaxCompletedStep(maxStep);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
