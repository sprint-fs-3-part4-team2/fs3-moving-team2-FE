import AuthPageLayout from '@/components/authPage/layouts/authPageLayout';
import LogoSection from '@/components/authPage/molecules/logoSection';
import TextUnderButton from '@/components/authPage/atoms/textUnderButton';
import FormGroupSection from '@/components/authPage/organisms/formGroupSection';
import SnsLogin from '@/components/common/SnsLogin';

// Mover Sign-In Page
export default function Page() {
  return (
    <AuthPageLayout>
      <LogoSection
        userType='mover'
        moveToPage='user/sign-in'
      />

      <FormGroupSection
        formType='signIn'
        userType='mover'
      />
      <TextUnderButton
        pageType='signIn'
        moveToPage='mover/sign-up'
      />

      <SnsLogin type='mover' />
    </AuthPageLayout>
  );
}
