import SignInFormGroup from '../signInFormGroup';
import SignUpFormGroup from '../signUpFormGroup';
import { FormGroupSectionProps } from './formGroupSecrion.type';

export default function FormGroupSection({
  formType,
  userType,
}: FormGroupSectionProps) {
  return (
    <>
      {formType === 'signIn' && <SignInFormGroup userType={userType} />}
      {formType === 'signUp' && <SignUpFormGroup userType={userType} />}
    </>
  );
}
