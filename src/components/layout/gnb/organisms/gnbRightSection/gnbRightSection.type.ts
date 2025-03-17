import { MenuIconProp } from '../../atoms/icons/menuIcon/menuIcon.type';
import { GnbMenuProps } from '../../molecules/gnbMenu/gnbMenu.type';
import { NotificationProps } from '../../molecules/notification/notification.type';
import { ProfileSecrionProps } from '../../molecules/profileSecrion/profileSecrion.type';

export interface GNBRightSectionProps
  extends NotificationProps,
    ProfileSecrionProps,
  MenuIconProp,
  GnbMenuProps{
  isUserAuthorized: boolean;
}
