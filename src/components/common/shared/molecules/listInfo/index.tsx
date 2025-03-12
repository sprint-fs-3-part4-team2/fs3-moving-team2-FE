import InfoContainer from '../../atoms/infoContainer';
import StringInfo from '../../atoms/stringInfo';
import ListInfoTitle from '../../atoms/listInfoTitle';
import { LIstInfoProps } from './listInfo.types';

export default function ListInfo({ title, content }: LIstInfoProps) {
  return (
    <InfoContainer>
      <ListInfoTitle>{title}</ListInfoTitle>
      <StringInfo>{content}</StringInfo>
    </InfoContainer>
  );
}
