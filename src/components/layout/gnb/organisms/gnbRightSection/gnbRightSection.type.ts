import { MenuIconProp } from '../../atoms/icons/menuIcon/menuIcon.type';
import { GnbMenuProps } from '../../molecules/gnbMenu/gnbMenu.type';
import { ProfileSectionProps } from '../../molecules/profileSection/profileSection.type';

export interface GNBRightSectionProps
  extends ProfileSectionProps,
    MenuIconProp,
    GnbMenuProps {
  isAuthorized: boolean;
}
