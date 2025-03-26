import { PagePath } from '../../common.types';

type UserType = 'customer' | 'mover';

export interface LogoSectionProps {
  userType: UserType;
  moveToPage: PagePath;
}
