import { InfoContainerProps } from './infoContainer.types';

export default function InfoContainer({ children }: InfoContainerProps) {
  return (
    <div className='flex gap-[10px] md:gap-[10px] xl:gap-[12px] flex-shrink-0'>
      {children}
    </div>
  );
}
