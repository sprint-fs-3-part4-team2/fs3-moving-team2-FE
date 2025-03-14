'use client';

import { useState, useRef } from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';
import RatingStars from '@/components/common/shared/molecules/ratingStars';
import MovingTypeGroup from '@/components/common/shared/molecules/movingTypeGroup';
import MoverDatePrice from '@/components/common/moverInfo/organisms/moverDatePriceInfo';
import { submitReview } from '@/services/reviewsService';

const moveTypeLabels = {
  SMALL_MOVE: 'small',
  HOME_MOVE: 'home',
  OFFICE_MOVE: 'office',
} as const;

type MoveType = keyof typeof moveTypeLabels;

interface ReviewableEstimate {
  id: string;
  driverName: string;
  driverProfileImage: string;
  serviceDate: string;
  estimatePrice: number;
  moveType: MoveType;
  isTargeted: boolean;
}

interface ReviewModalProps {
  estimate: ReviewableEstimate;
  onClose: () => void;
  onSubmit?: (estimateId: string) => void; // 콜백 prop 추가
}

export default function ReviewModal({
  estimate,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0); // 별점 상태
  const [comment, setComment] = useState(''); // 코멘트 상태
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지 여부
  const ratingRef = useRef<HTMLDivElement>(null); // 별점 컨테이너 참조

  // 리뷰 제출 함수
  const handleSubmit = async () => {
    if (rating === 0) {
      console.log('별점을 선택해주세요.');
      return;
    }
    if (comment.length < 10) {
      console.log('코멘트를 10자 이상 입력해주세요.');
      return;
    }
    try {
      await submitReview({
        estimateId: estimate.id,
        rating,
        comment,
      });
      console.log('리뷰가 제출되었습니다!');
      onSubmit?.(estimate.id); // 부모page에 제출완료 알림
      onClose();
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
      console.log('리뷰 제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 드래그 시작 (마우스 또는 터치)
  const handleStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    e.preventDefault(); // 브라우저 기본 동작(드래그, 선택) 차단
    setIsDragging(true);
  };

  // 드래그 중 (마우스 또는 터치)
  const handleMove = (clientX: number) => {
    if (!isDragging || !ratingRef.current) return;
    const rect = ratingRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left; // 컨테이너 내 상대 위치
    const starWidth = rect.width / 5; // 별 하나당 너비
    const newRating = Math.min(Math.max(Math.ceil(offsetX / starWidth), 0), 5); // 0~5 사이
    setRating(newRating);
  };

  // 드래그 종료 (마우스 또는 터치)
  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <ModalWrapper
      title='리뷰 쓰기'
      onClose={onClose}
      className='w-[608px]'
    >
      {/* 라벨 */}
      <div className='pt-[44px]'>
        <MovingTypeGroup
          movingType={[moveTypeLabels[estimate.moveType]]}
          isCustomQuote={estimate.isTargeted}
        />
      </div>
      {/* 무버 정보 */}
      <div className='pt-[24px]'>
        <MoverDatePrice
          moverName={estimate.driverName}
          imageUrl={estimate.driverProfileImage}
          price={estimate.estimatePrice}
          movingDate={new Date(estimate.serviceDate)}
        />
      </div>
      {/* 별점 */}
      <div className='pt-[32px]'>
        <div className='pb-[20px]'>
          <label className='text-black-300 font-[600] text-[20px]'>
            평점을 선택해 주세요
          </label>
        </div>
        <div
          ref={ratingRef}
          className={`inline-block select-none ${isDragging ? 'opacity-75' : ''}`}
          onMouseDown={handleStart}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleMove(touch.clientX);
          }}
          onTouchEnd={handleEnd}
        >
          <RatingStars
            rating={rating}
            onClick={setRating}
            iconClassName='text-yellow-400 w-[40px] h-[40px]'
          />
        </div>
        <div className='border-t-[1px] border-line-100'></div>
      </div>

      {/* 코멘트 입력 */}
      <div className='pt-[32px]'>
        <label className='text-black-300 font-[600] text-[20px]'>
          상세 후기를 작성해 주세요
        </label>
        <div className='pt-[16px]'>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='최소 10자 이상 입력해주세요'
            className='bg-backgroundVariants-200 placeholder-gray-300 text-black-400 w-full h-[160px] px-[24px] py-[14px] rounded-[16px] resize-none border-none focus:border-none focus:outline-none'
          />
        </div>
        <p
          className={
            comment.length === 0
              ? 'text-white text-sm'
              : comment.length < 10
                ? 'text-red-500 text-sm'
                : 'text-gray-500 text-sm'
          }
        >
          {comment.length}/10 자
        </p>
      </div>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0 || comment.length < 10}
        className={`mt-[16px] w-full y-[64px] rounded-[16px] font-[600] text-[20px]/[64px] ${
          rating === 0 || comment.length < 10
            ? 'bg-grayscale-100 text-white'
            : 'bg-primary-blue-300 text-white'
        }`}
      >
        리뷰 등록
      </button>
    </ModalWrapper>
  );
}
