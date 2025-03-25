import { useState, useEffect, PropsWithChildren } from 'react';
import Image from 'next/image';
import checkImage from './assets/check.svg';
import outImage from './assets/out.svg';
import cn from '@/utils/cn';
import { ToastProps } from './types/type';

const ICONS = {
  info: checkImage,
  warn: outImage,
};

export default function ToasterContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        'fixed flex flex-col-reverse gap-6 justify-center items-center top-16 left-1/2 -translate-x-1/2 pointer-events-none transition-[height] duration-500 ease-in-out z-[1000]',
      )}
    >
      {children}
    </div>
  );
}

export function Toast({ type, message, onClick }: ToastProps) {
  const isMounted = useIsMounted(100);
  const icon = ICONS[type];

  return (
    <div
      className={cn(
        'flex rounded-md text-white pt-[10px] pr-4 pb-[10px] pl-[12px] justify-center items-center gap-2 relative -top-2 opacity-0 transition-[top,opacity] duration-100 ease-in-out',
        isMounted && 'top-0 opacity-1',
        type === 'info'
          ? 'bg-primary-blue-200'
          : 'bg-secondary-red-200 animate-warn',
      )}
      onClick={onClick}
    >
      {icon && (
        <Image
          className={cn('w-6 h-6')}
          src={icon}
          alt={type}
          width={16}
          height={16}
        />
      )}
      {message}
    </div>
  );
}

function useIsMounted(delay: number) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isMounted;
}
