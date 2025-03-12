import formatDate from '@/utils/formatDate';
import MovingInfoRow from '../../molecules/movingInfoRow';
import { MovingInfoProps } from './movingInfo.types';
import MovingInfoHeader from '../../atoms/movingInfoHeader';
import {
  MOVING_INFO_CONTAINER_STYLE,
  MOVING_INFO_ROWS_CONTAINER_STYLE,
} from './constants';

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
    <div className={MOVING_INFO_CONTAINER_STYLE}>
      <MovingInfoHeader />
      <div className={MOVING_INFO_ROWS_CONTAINER_STYLE}>
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
    </div>
  );
}
