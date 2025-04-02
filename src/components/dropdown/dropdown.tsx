'use client';
import cn from '@/utils/cn';
import CtaBtn from './ctaBtn';
import {
  InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
} from 'react';
import { d2Class, ulClass } from './styles/drop.tailwind';

type D2dispatch = React.Dispatch<React.SetStateAction<string | object>>;
export interface DropdownProps extends PropsWithChildren {
  dispatch?: D2dispatch;
  onClick?: React.MouseEventHandler<HTMLLIElement | HTMLDivElement>;
  isOpen?: boolean;
  name?: string;
  className?: string;
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
  allbtn?: boolean;
  border?: boolean;
  labelName?: string;
}

export function DropdownCta({
  isOpen,
  className,
  data,
  dispatch,
  dropClassName,
  listClassName,
  border = true,
  allbtn = true,
  name,
  labelName = '전체',
}: DropdownCtaProps) {
  const [open, setOpen] = useState<boolean>(isOpen || false);
  const [value, setValue] = useState<string>(
    !allbtn ? data[0].name : labelName,
  );
  const targetRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div
      className={cn(
        'relative max-w-[328px] cursor-pointer',
        className && className,
      )}
      ref={targetRef}
    >
      <CtaBtn
        className={cn('')}
        border={border}
        type={open ? 'outline' : 'default'}
        height={border ? 'h-9 xl:h-16' : 'h-8 xl:h-10'}
        value={value}
        onClick={clickHandle}
      />
      {open && (
        <ul className={cn(ulClass, dropClassName, 'bg-white')}>
          {allbtn && (
            <List
              value='전체'
              name={name}
              className={cn(listClassName && listClassName)}
              font={cn(!border && 'text-xs xl:text-md')}
              onClick={ListHandle}
            />
          )}
          {data.map((v) => {
            return (
              <List
                key={v.name}
                name={name}
                className={cn(listClassName && listClassName)}
                font={cn(!border && 'text-xs xl:text-md')}
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
  font?: string;
}
export function List({ value, className, onClick, font, ...rest }: ListPorps) {
  const defaultFont = 'text-black-400 text-sm xl:text-lg';
  const padding = 'py-[6px] pl-[14px] xl:pl-[24px] xl:py-[19px]';

  return (
    <li
      className={cn(
        `hover:bg-grayscale-100 h-[36px] xl:h-[64px] relative`,
        font ? font : defaultFont,
        className && className,
      )}
    >
      <p className={cn('', font ? font : defaultFont, padding)}>{value}</p>
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
