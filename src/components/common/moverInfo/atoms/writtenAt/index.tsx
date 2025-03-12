import formatDate from '@/utils/formatDate';
import { WrittenAtProps } from './writtenAt.types';
import cn from '@/utils/cn';

export default function WrittenAt({ writtenDate, className }: WrittenAtProps) {
  const formattedDate = formatDate(writtenDate, false, false);
  return (
    <div
      className={cn(
        className,
        'items-center flex-shrink-0 text-gray-300 text-[12px] md:text-[12px] xl:text-[18px] gap-[6px] md:gap-[6px] xl:gap-2',
      )}
    >
      <span>작성일</span>
      <span>{formattedDate}</span>
    </div>
  );
}
