import Backdrop from '../atoms/backdrop';
import SideMenuLayout from '../atoms/layout';
import CloseIcon from '../atoms/closeIcon';
import SideBarMenu from '../molecule/sideBarMenu';
import { SideNavigationBarProps } from './sideNavigationBar.type';

export default function SideNavigationBar({
  userType,
  setIsOpen,
  isOpen,
}: SideNavigationBarProps) {
  return (
    <div>
      {isOpen && (
        <Backdrop>
          <SideMenuLayout>
            <CloseIcon closeOnClick={() => setIsOpen(false)} />
            <SideBarMenu userType={userType} />
          </SideMenuLayout>
        </Backdrop>
      )}
    </div>
  );
}
