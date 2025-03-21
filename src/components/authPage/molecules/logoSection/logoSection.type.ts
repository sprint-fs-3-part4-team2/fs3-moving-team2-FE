import { PagePath } from '../../common.types';

type UserType = 'user' | 'mover';

export interface LogoSectionProps {
  userType: UserType;
  moveToPage: PagePath;
}
