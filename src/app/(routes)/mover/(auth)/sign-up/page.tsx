import AuthPageLayout from '@/components/authPage/layouts/authPageLayout';
import LogoSection from '@/components/authPage/molecules/logoSection';
import TextUnderButton from '@/components/authPage/atoms/textUnderButton';
import FormGroupSection from '@/components/authPage/organisms/formGroupSection';
import SnsLogin from '@/components/common/SnsLogin';

// Mover Sign-Up Page
export default function Page() {
  return (
    <AuthPageLayout>
      <LogoSection
        userType='mover'
        moveToPage='user/sign-up'
      />

      <FormGroupSection
        userType='mover'
        formType='signUp'
      />
      <TextUnderButton
        pageType='signUp'
        moveToPage='mover/sign-in'
      />

      <SnsLogin type='mover' />
    </AuthPageLayout>
  );
}
