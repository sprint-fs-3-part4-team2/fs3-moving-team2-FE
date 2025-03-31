import { MenuIconProp } from '../../atoms/icons/menuIcon/menuIcon.type';
import { GnbMenuProps } from '../../molecules/gnbMenu/gnbMenu.type';
import { ProfileSecrionProps } from '../../molecules/profileSecrion/profileSecrion.type';

export interface GNBRightSectionProps
  extends ProfileSecrionProps,
    MenuIconProp,
    GnbMenuProps {
  isAuthorized: boolean;
}
