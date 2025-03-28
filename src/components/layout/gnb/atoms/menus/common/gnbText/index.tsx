'use client';

import cn from '@/utils/cn';
import { COMMON_TEXT_STYLES } from './constant';
import { GNBTextProps } from './gnbText.type';
import { highlightText } from '@/utils/highlightText';
import { usePathname } from 'next/navigation';

export default function Text({ linkHref, children }: GNBTextProps) {
  const pathname = usePathname();
  const highlighted = highlightText(linkHref as string[], pathname);

  return (
    <span
      className={cn(
        COMMON_TEXT_STYLES,
        highlighted ? 'font-black-400' : 'text-grayscale-400',
      )}
    >
      {children}
    </span>
  );
}
