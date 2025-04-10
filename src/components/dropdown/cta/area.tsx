'use client';
import cn from '@/utils/cn';
import { DropdownCtaProps, DropdownCta } from '../dropdown';
import area from '@/constants/dropdown/area';

export default function Area({
  className,
  isOpen,
  dispatch,
  currentValue,
}: Omit<DropdownCtaProps, 'data'>) {
  return (
    <DropdownCta
      name='area'
      className={cn('h-auto', className && className)}
      isOpen={isOpen}
      data={area}
      dispatch={dispatch}
      labelName='지역'
      currentValue={currentValue}
      dropClassName={cn(
        'flex overflow-auto max-h-[180px]',
        'w-[150px] xl:w-full xl:max-h-[320px]',
      )}
      listClassName={cn('w-1/2')}
    />
  );
}
