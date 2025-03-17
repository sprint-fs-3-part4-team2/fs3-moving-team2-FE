import GuestMenu from '../../atoms/menus/guestMenu';
import MoverMenu from '../../atoms/menus/moverMenu';
import UserMenu from '../../atoms/menus/userMenu';
import { SIDE_BAR_MENY_STYLE } from './constant';
import { SideBarMenuProps } from './sideBarMenu.type';


export default function SideBarMenu({
  userType,
}: SideBarMenuProps): JSX.Element {
  const menuMap = {
    'guest': <GuestMenu />,
    'user': <UserMenu />,
    'mover': <MoverMenu />,
  };

  return (
    <div className={SIDE_BAR_MENY_STYLE}>
      {menuMap[userType] || <GuestMenu />}
    </div>
  );
}
