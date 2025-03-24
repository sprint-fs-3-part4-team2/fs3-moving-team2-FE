import { GNBLogoProps } from '../molecules/gnbLogo/gnbLogo.type';
import { GnbMenuProps } from '../molecules/gnbMenu/gnbMenu.type';
import { GNBRightSectionProps } from '../organisms/gnbRightSection/gnbRightSection.type';

export interface GNBProps
  extends GNBLogoProps,
    GnbMenuProps,
    GNBRightSectionProps {}
