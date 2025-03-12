import { MovingInfoRowContainerProps } from './movingInfoRowContainer.types';

export default function MovingInfoRowContainer({
  children,
}: MovingInfoRowContainerProps) {
  return (
    <div className='flex w-full gap-10 md:gap-10 xl:-gap-8 items-center'>
      {children}
    </div>
  );
}
