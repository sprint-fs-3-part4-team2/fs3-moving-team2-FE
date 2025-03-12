import formatDate from '@/utils/formatDate';
import MovingInfoRow from '../../molecules/movingInfoRow';
import { MovingInfoProps } from './movingInfo.types';

export default function MovingInfo({
  requestedDate,
  movingType,
  movingDate,
  departure,
  arrival,
}: MovingInfoProps) {
  const formattedRequestedDate = formatDate(requestedDate, true, false);
  const formattedMovingDate = formatDate(movingDate, true, true);

  return (
    <div className='flex flex-col gap-[10px] md:gap-[10px] xl:gap-4 px-5 md:px-8 xl:px-10 py-4 md:py-6 xl:py-8 w-full bg-backgroundVariants-100 border-[1px] border-line-100 rounded-[16px]'>
      <MovingInfoRow
        title='견적 요청일'
        content={formattedRequestedDate}
      />
      <MovingInfoRow
        title='서비스'
        content={movingType}
      />
      <MovingInfoRow
        title='이용일'
        content={formattedMovingDate}
      />
      <MovingInfoRow
        title='출발지'
        content={departure}
      />
      <MovingInfoRow
        title='도착지'
        content={arrival}
      />
    </div>
  );
}
