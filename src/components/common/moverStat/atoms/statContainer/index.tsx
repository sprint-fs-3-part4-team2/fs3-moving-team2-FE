import { StatContainerProps } from './statContainer.types';

export default function StatContainer({ children }: StatContainerProps) {
  return (
    <div className='flex gap-[4px] md:gap-[4px] xl:gap-[6px]'>{children}</div>
  );
}
