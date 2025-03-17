import Image from 'next/image';
import { BellIconProp } from './bellIcon.type';
import { BELL_ICON_STYLES } from './constant';

export default function BellIcon({ onClick }: BellIconProp): JSX.Element {
  return (
    <div
      className={BELL_ICON_STYLES}
      onClick={onClick}
    >
      <Image
        src={'/icons/gnb/bell.svg'}
        alt='bell icon'
        fill
        className='object-contain'
      />
    </div>
  );
}
