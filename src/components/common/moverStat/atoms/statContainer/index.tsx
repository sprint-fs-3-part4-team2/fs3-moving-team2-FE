import cn from '@/utils/cn';
import { StatContainerProps } from './statContainer.types';

export default function StatContainer({
  children,
  isFavoriteMoverList,
}: StatContainerProps) {
  return (
    <div
      className={cn(
        'flex items-center flex-shrink-0',
        isFavoriteMoverList
          ? 'gap-[2px] md:gap-[2px] xl:gap-[2px]'
          : 'gap-[2px] md:gap-[2px] xl:gap-[6px]',
      )}
    >
      {children}
    </div>
  );
}
