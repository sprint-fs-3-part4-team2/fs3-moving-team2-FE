import { RequestedQuoteButtonsProps } from './requestedQuoteButtons.types';
import CommonBtn from '@/components/common/commonBtn/commonBtn';

export default function RequestedQuoteButtons({
  onSubmit,
  onDecline,
  isCustomQuote,
}: RequestedQuoteButtonsProps) {
  return (
    <div className='flex flex-col md:flex-row xl:flex-row w-full justify-between gap-[11px]'>
      <CommonBtn
        widthType={isCustomQuote ? 'half' : 'full'}
        heightType='primary'
        onClick={onSubmit}
      >
        견적 보내기
      </CommonBtn>
      {isCustomQuote && (
        <CommonBtn
          widthType='half'
          heightType='primary'
          backgroundColorType='white'
          textColorType='white'
          onClick={onDecline}
        >
          반려
        </CommonBtn>
      )}
    </div>
  );
}
