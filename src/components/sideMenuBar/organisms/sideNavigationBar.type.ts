import { SideBarMenuProps } from "../molecule/sideBarMenu/sideBarMenu.type";

export interface SideNavigationBarProps extends SideBarMenuProps{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
