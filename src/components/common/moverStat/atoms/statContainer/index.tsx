import { StatContainerProps } from './statContainer.types';

export default function StatContainer({ children }: StatContainerProps) {
  return (
    <div className='flex items-center gap-[2px] md:gap-[2px] xl:gap-[6px] flex-shrink-0'>
      {children}
    </div>
  );
}
