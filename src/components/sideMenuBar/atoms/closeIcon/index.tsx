import Image from 'next/image';
import { CLOSE_ICON_STYLES } from './constant';
import { CloseIconProps } from './closeIcon.type';

export default function CloseIcon({ closeOnClick }: CloseIconProps) {
  return (
    <div
      onClick={closeOnClick}
      className={CLOSE_ICON_STYLES}
    >
      <Image
        src='/icons/close.svg'
        alt='close'
        fill
      />
    </div>
  );
}
