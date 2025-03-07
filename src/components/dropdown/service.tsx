import cn from '@/utils/cn';
import { DropdownProps, List, ulClass } from './dropdown';
import service from '@/constants/service';
import CtaBtn from './ctaBtn';
import { useState } from 'react';

export default function Service({ className }: Omit<DropdownProps, 'isOpen'>) {
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
        <ul className={cn(ulClass, 'max-h-[142px] lg:max-h-[256px]')}>
          <List
            value='전체'
            onClick={ListHandle}
          />
          {service.map((v) => {
            return (
              <List
                key={v.name}
                value={v.name}
                onClick={ListHandle}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
