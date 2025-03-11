import cn from '@/utils/cn';
import { InfoTitleProps } from './infoTitle.types';

export default function InfoTitle({ children }: InfoTitleProps) {
  return (
    <span
      className={cn(
        'flex items-center px-1 py-[2px] bg-backgroundVariants-400 text-[13px] md:text-[13px] xl:text-[18px] rounded-[4px] text-grayscale-500 flex-shrink-0',
      )}
    >
      {children}
    </span>
  );
}
