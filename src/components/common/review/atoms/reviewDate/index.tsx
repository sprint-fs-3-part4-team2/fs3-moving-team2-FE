import { REVIEW_DATE_STYLES } from './constant';
import { ReviewDateProp } from './reviewDate.type';

export default function ReviwDate({ date }: ReviewDateProp) {
  return <span className={REVIEW_DATE_STYLES}>{date}</span>;
}
