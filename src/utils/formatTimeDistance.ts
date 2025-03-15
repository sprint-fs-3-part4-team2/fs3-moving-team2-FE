import { differenceInDays, formatDate, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatTimeDistance = (date: Date) => {
  const now = new Date();
  const monthDifference = differenceInDays(date, now);
  if (monthDifference > 1)
    return formatDate(date, 'yyyy. MM. dd', { locale: ko });
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ko,
  }).replace('1분 미만 전', '방금 전');
};
