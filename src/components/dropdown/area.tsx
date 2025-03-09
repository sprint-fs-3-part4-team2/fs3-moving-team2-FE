import cn from '@/utils/cn';
import { useState } from 'react';
import { DropdownProps, List, ulClass } from './dropdown';
import area from '@/constants/area';
import CtaBtn from './ctaBtn';

const filed = [{ name: '전체' }, ...area];

export default function Area({ className }: Omit<DropdownProps, 'isOpen'>) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('전체');
  function clickHandle() {
    setOpen((prev) => !prev);
  }
  function ListHandle(e: React.MouseEvent<HTMLInputElement>) {
    const { currentTarget } = e;
    setOpen(false);
    setValue(currentTarget.value);
  }
  return (
    <div className={cn('relative max-w-[328px]', className && className)}>
      <CtaBtn
        type={open ? 'outline' : 'default'}
        height='h-16'
        value={value}
        onClick={clickHandle}
      />
      {open && (
        <ul
          className={cn(
            ulClass,
            'flex overflow-auto max-h-[180px] lg:max-h-[320px]',
          )}
        >
          {filed.map((v) => {
            return (
              <List
                onClick={ListHandle}
                className='w-1/2'
                value={v.name}
                key={v.name}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
