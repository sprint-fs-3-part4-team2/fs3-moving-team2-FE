import cn from '@/utils/cn';
import { MovingInfoTitleProps } from './movingInfoTitle.types';

export default function MovingInfoTitle({
  children,
  className,
}: MovingInfoTitleProps) {
  return (
    <span
      className={cn(
        'text-[14px] md:text-[14px] xl:text-[18px] text-grayscale-300 w-[65px] md:w-[65px] xl:w-[90px]',
        className,
      )}
    >
      {children}
    </span>
  );
}
