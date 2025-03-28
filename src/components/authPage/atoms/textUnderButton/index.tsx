'user client';

import cn from '@/utils/cn';
import CustomText from '../customText';
import CustomLinkText from '../customLinkText';
import { TextUnderButtonProps } from './textUnderButton.type';
import { TEXT_UNDER_BUTTON_LAYOUT_STYLES, pageTypeContent } from './constant';

export default function TextUnderButton({
  pageType = 'signIn',
  moveToPage = 'user/sign-up',
}: TextUnderButtonProps) {
  const { text, linkText } = pageTypeContent[pageType];

  return (
    <div
      className={cn(
        TEXT_UNDER_BUTTON_LAYOUT_STYLES,
        'xl:gap[8px] xl:mt-[24px] xl:mb-[72px]',
      )}
    >
      <CustomText>{text}</CustomText>
      <CustomLinkText endpoint={moveToPage}>{linkText}</CustomLinkText>
    </div>
  );
}
