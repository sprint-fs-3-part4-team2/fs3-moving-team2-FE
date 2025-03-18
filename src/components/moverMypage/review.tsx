'use client';
import { MockData } from './reviewMockdata';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';

export default function ReviewPage() {
  return (
    <div>
      <ReviewBlock
        name={MockData[0].name}
        writtenAt={MockData[0].writtenAt}
        rating={MockData[0].rating}
        content={MockData[0].content}
      />
    </div>
  );
}
