import { DateInfoProps } from './movingDateInfo.types';
import cn from '@/utils/cn';
import { INFO_STYLE } from '../constants';
import formatDate from '@/utils/formatDate';

export default function DateInfo({ date, showDayOfWeek }: DateInfoProps) {
  const formattedDate = formatDate(date, showDayOfWeek, false);

  return <span className={cn(INFO_STYLE)}>{formattedDate}</span>;
}
