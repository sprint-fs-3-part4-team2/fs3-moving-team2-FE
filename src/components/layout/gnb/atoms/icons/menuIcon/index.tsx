import Image from 'next/image';
import { MenuIconProp } from './menuIcon.type';

export default function MenuIcon({ menuOnClick }: MenuIconProp): JSX.Element {
  return (
    <div
      className='relative w-[24px] h-[24px] xl:w-[36px] xl:h-[36px] xl:hidden cursor-pointer'
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
