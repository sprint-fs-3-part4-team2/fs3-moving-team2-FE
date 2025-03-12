import cn from '@/utils/cn';
import { HorizontalDividerProps } from './horizontalDivider.types';

export default function HorizontalDivider({
  className,
}: HorizontalDividerProps) {
  return (
    <hr className={cn('border-t-[1px] border-line-200 w-full', className)} />
  );
}
