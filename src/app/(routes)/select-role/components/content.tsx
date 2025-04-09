import { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

interface ContentProps extends PropsWithChildren {
  className?: string;
  title: string;
  comment: string;
  location: string;
}
export default function Content({
  className,
  children,
  title,
  comment,
  location,
}: ContentProps) {
  return (
    <div
      className={cn(
        'w-0 h-full opacity-0 bg-transparent transition-all duration-700 relative overflow-hidden',
        'md:w-1/2',

        !!className && className,
      )}
    >
      <div
        className={cn(
          'relative transition-all duration-700 w-full h-full flex flex-warp items-center justify-center flex-col',
          location,
        )}
      >
        <h2
          className={cn(
            'text-[48px] font-bold',
            'md:text-[55px]',
            'xl:text-[70px]',
          )}
          style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}
        >
          {title}
        </h2>
        <p
          className={cn(
            'text-[18px] my-6',
            'mx-auto md:my-5 xl:my-4 xl:text-[22px] font-normal w-[30ch] text-center break-words whitespace-normal',
            'md:my-5 text-[18px]',
          )}
          style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}
        >
          {comment}
        </p>
        {children}
      </div>
    </div>
  );
}
