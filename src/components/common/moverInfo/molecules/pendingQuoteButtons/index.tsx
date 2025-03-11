import { PendingQuoteButtonsProps } from './pendingQuoteButtons.types';

export default function PendingQuoteButtons({
  onConfirmClick,
  onDetailClick,
}: PendingQuoteButtonsProps) {
  return (
    <div className='flex flex-col md:flex-row xl:flex-row justify-between items-center gap-[8px] md:gap-[8px] xl:gap-[11px] xl:text-xl font-semibold'>
      <button
        className='bg-primary-blue-300 text-gray-50 w-full rounded-[16px] h-[48px] md:h-[48px] xl:h-[54px]'
        onClick={onConfirmClick}
      >
        견적 확정하기
      </button>
      <button
        className='text-primary-blue-300 w-full rounded-[16px] h-[48px] md:h-[48px] xl:h-[54px] border-[1px] border-primary-blue-300'
        onClick={onDetailClick}
      >
        상세보기
      </button>
    </div>
  );
}
