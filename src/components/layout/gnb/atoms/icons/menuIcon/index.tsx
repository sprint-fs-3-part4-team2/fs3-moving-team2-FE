import cn from '@/utils/cn';
import Image from 'next/image';
import { MenuIconProp } from './menuIcon.type';
import { MENU_ICON_STYLES } from '../../../styles/variables';

export default function MenuIcon({ menuOnClick, className }: MenuIconProp) {
  return (
    <div
      className={cn(MENU_ICON_STYLES, className)}
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
