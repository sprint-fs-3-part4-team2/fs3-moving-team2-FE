import GuestMenu from '../../atoms/menus/guestMenu';
import MoverMenu from '../../atoms/menus/moverMenu';
import UserMenu from '../../atoms/menus/userMenu';
import { SIDE_BAR_MENU_CONTENT_STYLE, SIDE_BAR_MENU_STYLE } from './constant';
import { SideBarMenuProps } from './sideBarMenu.type';

export default function SideBarMenu({
  userType,
}: SideBarMenuProps): JSX.Element {
  const menuMap = {
    guest: <GuestMenu />,
    customer: <UserMenu />,
    mover: <MoverMenu />,
  };

  return (
    <div className={SIDE_BAR_MENU_STYLE}>
      <div className={SIDE_BAR_MENU_CONTENT_STYLE}>
        {menuMap[userType] || <GuestMenu />}
      </div>
    </div>
  );
}
