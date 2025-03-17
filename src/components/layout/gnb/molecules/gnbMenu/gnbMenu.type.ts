type UserType = 'guest' | 'user' | 'mover';

export interface GnbMenuProps {
  userType: UserType;
}