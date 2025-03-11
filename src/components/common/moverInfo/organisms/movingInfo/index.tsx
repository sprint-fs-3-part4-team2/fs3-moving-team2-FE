import VerticalDivider from '@/components/common/moverStat/atoms/verticalDivider';
import InfoContainer from '../../atoms/infos/infoContainer';
import DateInfo from '../../atoms/infos/movingDateInfo';
import StringInfo from '../../atoms/infos/stringInfo';
import InfoTitle from '../../atoms/infoTitle';
import { MovingInfoProps } from './moveInfo.types';
import cn from '@/utils/cn';
import { CONTAINER_STYLE } from './constants';

export default function MovingInfo({
  movingDate,
  departure,
  arrival,
  showDayOfWeek,
}: MovingInfoProps) {
  return (
    <div
      className={cn('flex flex-col md:flex-col xl:flex-row', CONTAINER_STYLE)}
    >
      <InfoContainer>
        <InfoTitle>이사일</InfoTitle>
        <DateInfo
          date={movingDate}
          showDayOfWeek={showDayOfWeek}
        />
      </InfoContainer>
      <VerticalDivider className='hidden md:hidden xl:block' />
      <div className={cn('flex', CONTAINER_STYLE)}>
        <InfoContainer>
          <InfoTitle>출발</InfoTitle>
          <StringInfo>{departure}</StringInfo>
        </InfoContainer>
        <VerticalDivider />
        <InfoContainer>
          <InfoTitle>도착</InfoTitle>
          <StringInfo>{arrival}</StringInfo>
        </InfoContainer>
      </div>
    </div>
  );
}
