'use client';

import Link from 'next/link';
import cn from '@/utils/cn';
import { CustomLinkTextProps } from './customLinkText.type';

export default function CustomLinkText({
  endpoint,
  children,
}: CustomLinkTextProps) {

  return (
    <Link
      href={`/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`}
      key={endpoint}
    >
      <span
        className={cn(
          'text-xs text-primary-blue-300 font-semibold ml-[4px] underline',
          'xl:text-xl xl:ml-[8px]',
          'hover:text-blue-600',
        )}
      >
        {children}
      </span>
    </Link>
  );
}
