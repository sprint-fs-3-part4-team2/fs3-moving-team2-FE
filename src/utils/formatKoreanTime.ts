export default function formatKoreanTime(time: string): string {
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const period = hour < 12 ? '오전' : '오후';
  if (hour === 0) hour = 12;
  if (hour > 12) hour = hour - 12;
  return `${period} ${hour}시 ${minuteStr}분`;
}
