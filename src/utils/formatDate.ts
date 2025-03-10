import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const formatDate = (date: Date, dayOfWeek: boolean) => {
  const formatPattern = dayOfWeek ? 'yyyy. MM. dd(E)' : 'yyyy. MM. dd';
  return format(date, formatPattern, { locale: ko });
};

export default formatDate;
