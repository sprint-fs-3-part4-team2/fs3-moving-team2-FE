'use client';

import Link from 'next/link';
import { TabProps } from './tab.types';
import { usePathname } from 'next/navigation';
import cn from '@/utils/cn';

export default function Tab({ url, tabContent }: TabProps) {
  const pathname = usePathname();
  const matchUrl = pathname === url;

  return (
    <div className='flex items-center'>
      <Link
        href={url}
        className={cn(
          'border-b-2 border-b-transparent',
          matchUrl ? 'text-black border-b-black-400' : 'text-gray-400 ',
          'text-[14px] md:text-[14px] xl:text-[20px] font-semibold pb-[15px] md:pb-[15px] xl:pb-4 leading-8',
        )}
      >
        {tabContent}
      </Link>
    </div>
  );
}
