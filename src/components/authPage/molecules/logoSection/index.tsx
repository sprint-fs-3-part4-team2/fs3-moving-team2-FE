import cn from '@/utils/cn';
import AuthLogo from '../../atoms/authLogo';
import CustomLinkText from '../../atoms/customLinkText';
import CustomText from '../../atoms/customText';
import { userTypeContent } from './constants';
import { LogoSectionProps } from './logoSection.type';

export default function LogoSection({
  userType = 'customer',
  moveToPage = 'mover/sign-in',
}: LogoSectionProps) {
  const { text, linkText } = userTypeContent[userType];

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center gap-[20px]',
        'xl:gap-[30px]',
      )}
    >
      <AuthLogo />
      <div>
        <CustomText>{text}</CustomText>
        <CustomLinkText endpoint={moveToPage}>{linkText}</CustomLinkText>
      </div>
    </div>
  );
}
