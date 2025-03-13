'use client';
import { MockData } from './reviewMockdata';
import RatingStars from '@/components/common/shared/molecules/ratingStars';
import { useState } from 'react';

interface ReviewProps {
  nickname: string;
  data: string;
  rating: number;
  content: string;
}

export default function ReviewItem({
  nickname,
  data,
  rating,
  content,
}: ReviewProps) {
  return (
    <div className='border-b border-gray-300 py-4'>
      <div className='flex items-center justify-between'>
        <span className='text-black-400 font-bold'>{nickname}</span>
        <span className='text-gray-300 '>{data}</span>
      </div>
      <RatingStars
        rating={rating} // 클릭하는 위치에 따라 점수를 변경하고 싶다면 상태를 입력하고 특정 점수를 보여주고 싶다면 상수를 입력해주세요.
        // onClick={setRating} // optional 별점을 눌렀을 때 실행할 함수
        iconClassName='text-yellow-500 w-6 h-6' // optional 별 아이콘에 적용할 클래스네임 (각 별 아이콘에 적용됨)
      />
      <p className='mt-2 text-gray-700'>{content}</p>
    </div>
  );
}
