import { PendingQuoteButtonsProps } from './pendingQuoteButtons.types';

export default function PendingQuoteButtons({
  onConfirmClick,
  onDetailClick,
}: PendingQuoteButtonsProps) {
  return (
    <div className='flex justify-between gap-[11px]'>
      <button onClick={onConfirmClick}>견적 확정하기</button>
      <button onClick={onDetailClick}>상세보기</button>
    </div>
  );
}
