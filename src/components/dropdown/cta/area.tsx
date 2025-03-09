'use client';
import cn from '@/utils/cn';
import { DropdownCtaProps, DropdownCta } from '../dropdown';
import area from '@/constants/area';

export default function Area({
  className,
  isOpen,
  dispatch,
}: Omit<DropdownCtaProps, 'data'>) {
  return (
    <DropdownCta
      name='area'
      className={cn(className && className)}
      isOpen={isOpen}
      data={area}
      dispatch={dispatch}
      dropClassName={cn('flex overflow-auto max-h-[180px] lg:max-h-[320px]')}
      listClassName={cn('w-1/2')}
    />
  );
}
