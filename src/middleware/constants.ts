import { UserType } from '@/components/authPage/common.types';

export const PROTECT = {
  NO_USER: ['/mover', '/user'],
  CUSTOMER: ['/user'],
  MOVER: ['/mover'],
};

export type protectType = {
  NO_USER: string[];
  CUSTOMER: string[];
  MOVER: string[];
};

export interface CustomJWT {
  userId: string;
  type: UserType;
  roleId: string;
  iat: number;
  exp: number;
}
