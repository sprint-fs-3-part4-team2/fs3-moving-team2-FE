import VerticalDivider from '@/components/common/shared/atoms/verticalDivider';
import { MovingInfoProps } from './moveInfo.types';
import cn from '@/utils/cn';
import { CONTAINER_STYLE } from './constants';
import ListInfo from '@/components/common/shared/molecules/listInfo';
import formatDate from '@/utils/formatDate';

export default function MovingInfoForList({
  movingDate,
  departure,
  arrival,
  showDayOfWeek,
}: MovingInfoProps) {
  const formattedDate = formatDate(movingDate, showDayOfWeek, false);

  return (
    <div
      className={cn('flex flex-col md:flex-row xl:flex-row', CONTAINER_STYLE)}
    >
      <ListInfo
        title='이사일'
        content={formattedDate}
      />
      <VerticalDivider className='hidden md:hidden xl:block' />
      <div className={cn('flex', CONTAINER_STYLE)}>
        <ListInfo
          title='출발'
          content={departure}
        />
        <VerticalDivider />
        <ListInfo
          title='도착'
          content={arrival}
        />
      </div>
    </div>
  );
}
