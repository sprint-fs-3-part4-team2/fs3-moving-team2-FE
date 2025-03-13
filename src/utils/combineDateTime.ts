export default function combineDateTime(
  date: string | Date,
  time: string,
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date: ' + date);
  }
  const [hour, minute] = time.split(':');
  d.setHours(parseInt(hour, 10));
  d.setMinutes(parseInt(minute, 10));
  return d.toISOString();
}
