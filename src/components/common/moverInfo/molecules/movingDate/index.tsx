import DateInfo from '../../../shared/atoms/listInfos/movingDateInfo';
import InfoContainer from '../../../shared/atoms/listInfos/infoContainer';
import InfoTitle from '../../../shared/atoms/listInfoTitle';
import { MovingDateProps } from './movingDate.types';

export default function MovingDate({ date, showDayOfWeek }: MovingDateProps) {
  return (
    <InfoContainer>
      <InfoTitle>이사일</InfoTitle>
      <DateInfo
        date={date}
        showDayOfWeek={showDayOfWeek}
      />
    </InfoContainer>
  );
}
