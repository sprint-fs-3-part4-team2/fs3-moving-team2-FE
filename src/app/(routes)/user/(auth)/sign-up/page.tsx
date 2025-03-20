import AuthPageLayout from '@/components/authPage/layouts/authPageLayout';
import LogoSection from '@/components/authPage/molecules/logoSection';
import TextUnderButton from '@/components/authPage/atoms/textUnderButton';
import FormGroupSection from '@/components/authPage/organisms/formGroupSection';
import SnsLogin from '@/components/common/SnsLogin';

// User Sign-Up Page
export default function Page() {
  return (
    <AuthPageLayout>
      <LogoSection
        userType='user'
        moveToPage='mover/sign-in'
      />

      <FormGroupSection formType='signUp' />
      <TextUnderButton
        pageType='signUp'
        moveToPage='user/sign-in'
      />

      <SnsLogin />
    </AuthPageLayout>
  );
}
