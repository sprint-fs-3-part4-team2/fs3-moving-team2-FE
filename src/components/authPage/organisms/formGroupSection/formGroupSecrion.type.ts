import { UserType } from '../../common.types';

export interface FormGroupSectionProps {
  formType: 'signIn' | 'signUp';
  userType: UserType;
}
