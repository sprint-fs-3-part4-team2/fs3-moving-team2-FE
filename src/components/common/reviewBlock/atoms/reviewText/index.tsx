import cn from '@/utils/cn';
import { ReviewTextProp } from './reviewText.types';
import { REVIEW_TEXT_STYLES } from './constant';

export default function ReviewText({ content, className }: ReviewTextProp) {
  return <p className={cn(REVIEW_TEXT_STYLES, className)}>{content}</p>;
}
