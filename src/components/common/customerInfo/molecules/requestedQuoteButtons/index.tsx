import { RequestedQuoteButtonsProps } from './requestedQuoteButtons.types';
import CommonBtn from '@/components/common/commonBtn/commonBtn';
import editIcon from '@/public/icons/edit.svg';
import cn from '@/utils/cn';
import Image from 'next/image';

export default function RequestedQuoteButtons({
  onSubmit,
  onDecline,
  isCustomQuote,
}: RequestedQuoteButtonsProps) {
  return (
    <div className='flex flex-col md:flex-row xl:flex-row w-full justify-between gap-[11px]'>
      <CommonBtn
        widthType='dynamic'
        heightType='primary'
        onClick={onSubmit}
        className={cn(
          'flex items-center justify-center w-full',
          isCustomQuote && 'md:w-1/2 xl:w-1/2',
        )}
      >
        견적 보내기
        <Image
          src={editIcon}
          alt='견적 보내기 아이콘'
          width={24}
          height={24}
        />
      </CommonBtn>
      {isCustomQuote && (
        <CommonBtn
          widthType='dynamic'
          heightType='primary'
          className={cn(
            'flex items-center justify-center w-full',
            isCustomQuote && 'md:w-1/2 xl:w-1/2',
          )}
          backgroundColorType='white'
          textColorType='blue'
          borderColorsType='blue'
          onClick={onDecline}
        >
          반려
        </CommonBtn>
      )}
    </div>
  );
}
