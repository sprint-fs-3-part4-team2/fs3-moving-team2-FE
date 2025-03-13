import cn from '@/utils/cn';
import { REVIEW_DATE_STYLES } from './constant';
import { ReviewDateProp } from './reviewDate.type';

export default function ReviewDate({ writtenAt, className }: ReviewDateProp) {
  return <span className={cn(REVIEW_DATE_STYLES, className)}>{writtenAt}</span>;
}
