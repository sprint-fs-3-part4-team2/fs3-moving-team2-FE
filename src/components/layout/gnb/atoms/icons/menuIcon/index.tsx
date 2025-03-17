import Image from 'next/image';
import { MenuIconProp } from './menuIcon.type';
import { MENU_ICON_STYLES } from './constant';

export default function MenuIcon({ menuOnClick }: MenuIconProp): JSX.Element {
  return (
    <div
      className={MENU_ICON_STYLES}
      onClick={menuOnClick}
    >
      <Image
        src={'/icons/gnb/menu.svg'}
        alt='menu icon'
        fill
        className='object-contain'
      />
    </div>
  );
}
