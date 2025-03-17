'use client';

import ReviewHeader from '@/components/common/reviewBlock/organisms/reviewHeader';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import RatingStars from '@/components/common/shared/molecules/ratingStars';
import SnsLogin from '@/components/common/SnsLogin';
import { useState } from 'react';

export default function TestPage() {
  const [rating, setRating] = useState(0);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <ReviewBlock
        name='안성재'
        writtenAt='2025-03-14'
        rating={3}
        content='정말 멋진 이사였습니다. 이븐한 이사라고 할 수 있겠네요.'
        className=''
      />
    </div>
  );
}
