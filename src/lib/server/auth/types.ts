import { UserType } from '@/components/authPage/common.types';
import { JWTPayload } from 'jose';

export interface CustomJWTPayload extends JWTPayload {
  userId: string;
  type: UserType;
  roleId: string;
}
