'use client';

import cn from '@/utils/cn';
import { COMMON_TEXT_STYLES } from './constant';
import { GNBTextProps } from './gnbText.type';
import { highlightText } from '@/utils/highlightText';

export default function Text({ linkHref, children }: GNBTextProps) {
  const highlighted = highlightText(linkHref as string[]);

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
