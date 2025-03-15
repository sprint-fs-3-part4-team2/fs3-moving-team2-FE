import CommonButton from '@/components/common/commonBtn/commonBtn';
import { PendingQuoteButtonsProps } from './pendingQuoteButtons.types';
import { PENDING_QUOTE_BUTTON_STYLE } from './constants';

export default function PendingQuoteButtons({
  onConfirmClick,
  onDetailClick,
}: PendingQuoteButtonsProps) {
  return (
    <div className='flex flex-col md:flex-row xl:flex-row justify-between items-center gap-[8px] md:gap-[8px] xl:gap-[11px] xl:text-xl'>
      <CommonButton
        widthType='dynamic'
        heightType='primary'
        className={PENDING_QUOTE_BUTTON_STYLE}
        onClick={onConfirmClick}
      >
        견적 확정하기
      </CommonButton>
      <CommonButton
        widthType='dynamic'
        heightType='primary'
        backgroundColorType='white'
        borderColorsType='blue'
        textColorType='blue'
        className={PENDING_QUOTE_BUTTON_STYLE}
        onClick={onDetailClick}
      >
        상세보기
      </CommonButton>
    </div>
  );
}
