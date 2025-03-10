import { ReviewContentProps } from './reviewContent.types';

export default function ReviewContent({ children }: ReviewContentProps) {
  return (
    <span className='text-gray-500 text-[14px] md:text-[14px] xl:text-[20px] line-clamp-2'>
      {children}
    </span>
  );
}
