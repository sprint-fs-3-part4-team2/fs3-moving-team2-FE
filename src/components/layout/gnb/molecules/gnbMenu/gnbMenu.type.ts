type UserType = 'guest' | 'customer' | 'mover';

export interface GnbMenuProps {
  userType: UserType;
}