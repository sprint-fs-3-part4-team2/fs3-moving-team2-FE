import { GnbMenuProps } from './gnbMenu.type';
import GuestMenu from '../../atoms/menus/guestMenu';
import UserMenu from '../../atoms/menus/userMenu';
import MoverMenu from '../../atoms/menus/moverMenu';

export default function GNBMenu({ userType }: GnbMenuProps): JSX.Element {
  const menuMap = {
    guest: <GuestMenu />,
    user: <UserMenu />,
    mover: <MoverMenu />,
  };

  return <div className='hidden xl:flex xl:gap-10 '>{menuMap[userType] || <GuestMenu />}</div>;
}
