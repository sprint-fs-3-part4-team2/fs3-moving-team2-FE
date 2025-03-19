import CommonButton from '@/components/common/commonBtn/commonBtn';
import cn from '@/utils/cn';
import CustomText from '../../atoms/customText';
import CustomLinkText from '../../atoms/customLinkText';
import { ActionButtonSectionProps } from './ActionButtonSection.type';
import {
  ACTION_BUTTON_SECRION_LAYOUT_STYLES,
  pageTypeContent,
} from './constant';

export default function ActionButtonSection({
  pageType = 'signIn',
  moveToPage = 'user/sign-up',
}: ActionButtonSectionProps) {
  const { text, linkText, buttonText } = pageTypeContent[pageType];

  return (
    <div
      className={cn(
        ACTION_BUTTON_SECRION_LAYOUT_STYLES,
        'xl:gap-[24px] xl:mb-[72px]',
      )}
    >
      <CommonButton
        widthType='full'
        heightType='primary'
        backgroundColorType='blue'
        borderColorsType='blue'
        className={cn('font-semibold text-lg', 'xl:text-xl')}
      >
        {buttonText}
      </CommonButton>
      <div>
        <CustomText>{text}</CustomText>
        <CustomLinkText endpoint={moveToPage}>{linkText}</CustomLinkText>
      </div>
    </div>
  );
}
