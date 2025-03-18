'use client';

import { BADGE_COLOR } from './constants';
import { ServiceBadgeProps } from './serviceBadge.types';
import cn from '@/utils/cn';

export default function ServiceBadge({
  children,
  color,
  selected,
  onSelect,
}: ServiceBadgeProps) {
  return (
    <div
      className={cn(
        'justify-center inline-flex px-3 md:px-3 xl:px-5 py-[6px] md:py-[6px] xl:py-[10px] border rounded-full text-[14px] md:text-[14px] xl:tex-[18px] font-medium select-none',
        selected && (selected === true ? BADGE_COLOR.blue : BADGE_COLOR.gray),
        color && BADGE_COLOR[color],
        onSelect && 'cursor-pointer',
      )}
      onClick={onSelect}
    >
      {children}
    </div>
  );
}
