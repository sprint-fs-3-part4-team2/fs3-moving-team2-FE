import SignInFormGroup from '../signInFormGroup';
import SignUpFormGroup from '../signUpFormGroup';
import { FormGroupSectionProps } from './formGroupSecrion.type';

export default function FormGroupSection({ formType }: FormGroupSectionProps) {
  return (
    <>
      {formType === 'signIn' && <SignInFormGroup />}
      {formType === 'signUp' && <SignUpFormGroup />}
    </>
  );
}
