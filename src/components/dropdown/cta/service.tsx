'use client';
import cn from '@/utils/cn';
import { DropdownCtaProps, DropdownCta } from '../dropdown';
import service from '@/constants/dropdown/service';

export default function Service({
  className,
  isOpen,
  dispatch,
  currentValue,
}: Omit<DropdownCtaProps, 'data'>) {
  return (
    <DropdownCta
      name='service'
      className={cn(className && className)}
      isOpen={isOpen}
      labelName='서비스'
      currentValue={currentValue}
      data={service}
      dispatch={dispatch}
      dropClassName={cn('max-h-[142px] lg:max-h-[256px]')}
    />
  );
}
