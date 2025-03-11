import { ReviewStatHeaderProps } from './reviewStatHeader.types';

export default function ReviewStatHeader({
  totalCount,
}: ReviewStatHeaderProps) {
  const formattedCount = totalCount.toLocaleString() ?? 0;

  return <span className='xl:text-2xl font-bold'>리뷰 ({formattedCount})</span>;
}
