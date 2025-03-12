import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const formatDate = (
  date: Date,
  includeDayOfWeek: boolean,
  includeTime: boolean,
) => {
  const datePattern = 'yyyy. MM. dd';
  const dayOfWeek = includeDayOfWeek ? '(E)' : '';
  const time = includeTime ? ' a hh:mm' : '';
  const formatPattern = [datePattern, dayOfWeek, time].join('');

  return format(date, formatPattern, { locale: ko });
};

export default formatDate;
