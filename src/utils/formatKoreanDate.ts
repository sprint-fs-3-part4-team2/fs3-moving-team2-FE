import { format } from 'date-fns';

// 2025-03-03T20:35:00.000Z -> 2025년 3월 3일
const formatKoreanDate = (date: string | Date): string => {
  // 새로운 Date 객체로 변환한 후 원하는 포맷으로 반환합니다.
  return format(new Date(date), 'yyyy년 M월 d일');
};

export default formatKoreanDate;
