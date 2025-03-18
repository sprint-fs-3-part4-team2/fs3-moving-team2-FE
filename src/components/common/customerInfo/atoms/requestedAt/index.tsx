import { formatTimeDistance } from '@/utils/formatTimeDistance';
import { RequestedAtProps } from './requestedAt.types';

export default function RequestedAt({ requestedAt }: RequestedAtProps) {
  const formattedDate = formatTimeDistance(requestedAt);

  return (
    <span className='text-[12px] md:text-[12px] xl:text-[14px] text-grayscale-500 font-regular'>
      {formattedDate}
    </span>
  );
}
