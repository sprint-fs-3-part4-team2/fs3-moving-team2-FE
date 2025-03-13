import Image from 'next/image';
import { MovingTypeBadgeProps } from './movingTypeBadge.types';
import cn from '@/utils/cn';
import { options } from './constants';

export default function MovingTypeBadge({
  type,
  className,
}: MovingTypeBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex pr-[6px] pl-[3px] py-[4px] font-semibold text-[13px] md:text-[13px] xl:text-base rounded-[4px]',
        options[type].style,
        className ?? '',
      )}
    >
      <div className='flex justify-between items-center gap-1'>
        {options[type].icon && (
          <Image
            src={options[type].icon}
            alt={type}
            width={16}
          />
        )}
        <span>{options[type].text}</span>
      </div>
    </div>
  );
}
