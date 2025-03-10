'use client';
import cn from '@/utils/cn';
import Service from './cta/service';
import Area from './cta/area';
import { C2 } from '@/lib/types/type';
import Alarm from './children/alarm';
import Profile from './children/profile';
import CtaBtn from './ctaBtn';
import { InputHTMLAttributes, useState } from 'react';
import { d2Class, ulClass } from './styles/drop.tailwind';

type D2dispatch = React.Dispatch<React.SetStateAction<string | object>>;
export interface DropdownProps extends C2 {
  dispatch?: D2dispatch;
  onClick?: React.MouseEventHandler<HTMLLIElement | HTMLDivElement>;
  isOpen?: boolean;
  name?: string;
}
export default function Dropdown({
  className,
  children,
  isOpen,
}: DropdownProps) {
  if (isOpen)
    return (
      <>
        <div className={cn(d2Class, className && className)}>{children}</div>
      </>
    );
}

export interface DropdownCtaProps
  extends Omit<DropdownProps, 'dispatch' | 'children'> {
  data: { name: string }[];
  dropClassName?: string;
  listClassName?: string;
  dispatch: D2dispatch;
}

export function DropdownCta({
  isOpen,
  className,
  data,
  dispatch,
  dropClassName,
  listClassName,
  name,
}: DropdownCtaProps) {
  const [open, setOpen] = useState<boolean>(isOpen || false);
  const [value, setValue] = useState<string>('전체');
  function clickHandle() {
    setOpen((prev) => !prev);
  }
  function ListHandle(e: React.MouseEvent<HTMLInputElement>) {
    const { currentTarget } = e;
    setOpen(false);
    setValue(currentTarget.value);
    if (dispatch) {
      dispatch(currentTarget.value);
    }
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
        <ul className={cn(ulClass, dropClassName && dropClassName)}>
          <List
            value='전체'
            name={name}
            className={cn(listClassName && listClassName)}
            onClick={ListHandle}
          />
          {data.map((v) => {
            return (
              <List
                key={v.name}
                name={name}
                className={cn(listClassName && listClassName)}
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

interface ListPorps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  value: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}
export function List({ value, className, onClick, ...rest }: ListPorps) {
  const font = 'text-black-400 text-lg';
  const padding = 'py-[6px] pl-[14px] lg:pl-[24px] lg:py-[19px]';

  return (
    <li
      className={cn(
        `hover:bg-grayscale-100 h-[36px] lg:h-[64px] relative`,
        font,
        className && className,
      )}
    >
      <p className={cn('', font, padding)}>{value}</p>
      <input
        className={cn(
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer',
          'border-0 w-[99%] m-auto h-[95%] bg-transparent text-transparent overflow-hidden',
          'focus:ring-0',
          padding,
        )}
        onClick={onClick}
        type='text'
        value={value}
        style={{ textIndent: '-9999px' }}
        readOnly
        {...rest}
      />
    </li>
  );
}

Dropdown.Service = Service;
Dropdown.Area = Area;
Dropdown.Alram = Alarm;
Dropdown.Profile = Profile;
