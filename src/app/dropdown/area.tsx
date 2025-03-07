import cn from '@/utils/cn';
import { DropdownProps, List, d2Class } from './dropdown';
import area from '@/constants/area';

const filed = [{ name: '전체' }, ...area];

export default function Area({ className, isOpen }: DropdownProps) {
  if (isOpen)
    return (
      <ul
        className={cn(
          d2Class,
          'max-h-[180px] lg:max-h-[320px]',
          className && className,
        )}
      >
        {filed.map((v) => {
          return (
            <List
              className='w-1/2'
              value={v.name}
              key={v.name}
            />
          );
        })}
      </ul>
    );
}
