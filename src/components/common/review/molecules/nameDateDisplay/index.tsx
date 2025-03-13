import ReviewDate from '../../atoms/reviewDate';
import UserName from '../../atoms/userName';
import { CENTER_LINE_STYLES, NAME_DATE_DISPLAY_BOX_STYLES } from './constants';
import { NameDateDisplayProps } from './nameDateDisplay.type';

export default function NameDateDisplay({
  name,
  writtenAt,
}: NameDateDisplayProps): JSX.Element {
  return (
    <div className={NAME_DATE_DISPLAY_BOX_STYLES}>
      <UserName name={name} />
      <span className={CENTER_LINE_STYLES}>|</span>
      <ReviewDate writtenAt={writtenAt} />
    </div>
  );
}
