import DateInfo from '../../atoms/infos/movingDateInfo';
import InfoContainer from '../../atoms/infos/infoContainer';
import InfoTitle from '../../atoms/infoTitle';
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
