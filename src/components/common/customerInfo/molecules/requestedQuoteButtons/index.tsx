import cn from '@/utils/cn';
import { RequestedQuoteButtonsProps } from './requestedQuoteButtons.types';

export default function RequestedQuoteButtons({
  onSubmit,
  onDecline,
  isCustomQuote,
}: RequestedQuoteButtonsProps) {
  return (
    <div className='flex flex-col md:flex-row xl:flex-row w-full justify-between gap-[11px]'>
      <button
        className={cn(
          'bg-primary-blue-300 text-gray-50 rounded-[16px] h-[48px] md:h-[48px] xl:h-[54px]',
          isCustomQuote ? 'w-1/2' : 'w-full',
        )}
        onClick={onSubmit}
      >
        견적 보내기
      </button>
      {isCustomQuote && (
        <button
          className='text-primary-blue-300 w-1/2 rounded-[16px] h-[48px] md:h-[48px] xl:h-[54px] border-[1px] border-primary-blue-300'
          onClick={onDecline}
        >
          반려
        </button>
      )}
    </div>
  );
}
