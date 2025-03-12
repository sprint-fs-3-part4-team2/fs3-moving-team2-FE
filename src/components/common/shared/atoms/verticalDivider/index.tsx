import cn from '@/utils/cn';
import { VerticalDividerProps } from './verticalDivider.types';

export default function VerticalDivider({ className }: VerticalDividerProps) {
  return <span className={cn('text-line-200', className)}>|</span>;
}
