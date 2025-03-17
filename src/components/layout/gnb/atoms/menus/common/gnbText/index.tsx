'use client';

import cn from '@/utils/cn';
import { COMMON_TEXT_STYLES } from './constant';
import { GNBTextProps } from './gnbText.type';
import { usePathname } from 'next/navigation';

export default function Text({ linkHref, children }: GNBTextProps) {
  const pathname = usePathname();
  const isActive = pathname === linkHref;

  return (
    <span
      className={cn(
        COMMON_TEXT_STYLES,
        isActive ? 'font-black-400' : 'text-grayscale-400',
      )}
    >
      {children}
    </span>
  );
}
