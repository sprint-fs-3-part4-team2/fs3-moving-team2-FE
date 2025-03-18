'use client';

import cn from '@/utils/cn';
import ReviewHeader from '../../organisms/reviewHeader';
import { REVIEW_BLOCK_STYLES } from './constant';
import { ReviewBlockProp } from './reviewBlock.type';
import ReviewText from '../../atoms/reviewText';

export default function ReviewBlock({
  name,
  writtenAt,
  rating,
  content,
  className,
}: ReviewBlockProp): JSX.Element {
  return (
    <div className={cn(REVIEW_BLOCK_STYLES, className)}>
      <ReviewHeader
        name={name}
        writtenAt={writtenAt}
        rating={rating}
      />
      <ReviewText content={content} />
    </div>
  );
}
