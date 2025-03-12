import MovingInfoContent from '../../atoms/movingInfoContent';
import MovingInfoRowContainer from '../../atoms/movingInfoRowContainer';
import MovingInfoTitle from '../../atoms/movingInfoTitle';
import { MovingInfoRowProps } from './movingInfoRow.types';

export default function MovingInfoRow({ content, title }: MovingInfoRowProps) {
  return (
    <MovingInfoRowContainer>
      <MovingInfoTitle>{title}</MovingInfoTitle>
      <MovingInfoContent>{content}</MovingInfoContent>
    </MovingInfoRowContainer>
  );
}
