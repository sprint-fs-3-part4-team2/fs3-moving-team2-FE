import cn from '@/utils/cn';
import { MovingInfoContentProps } from './movingInfoContent.types';

export default function MovingInfoContent({
  children,
  className,
}: MovingInfoContentProps) {
  return (
    <span
      className={cn(
        'text-[14px] md:text-[14px] xl:text-[18px] text-black-400',
        className,
      )}
    >
      {children}
    </span>
  );
}
