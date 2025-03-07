import cn from '@/utils/cn';
import Service from './service';
import Area from './area';
import { C2 } from '@/lib/types/type';
import Alarm from './alarm';
import Profile from './profile';

export interface DropdownProps extends C2 {
  setValue?: React.Dispatch<React.SetStateAction<string | object>>;
  onClick?: React.MouseEventHandler<HTMLLIElement | HTMLDivElement>;
  isOpen: boolean;
}
export const d2Class = cn(
  `flex flex-wrap bg-white rounded-md w-full max-w-[150px] lg:rounded-2xl lg:max-w-[330px] overflow-auto`,
);
export default function Dropdown({
  className,
  children,
  isOpen,
}: DropdownProps) {
  if (isOpen)
    return (
      <div className={cn(d2Class, className && className)}>{children}</div>
    );
}

interface ListPorps {
  value: string;
  className?: string;
}
export function List({ value, className }: ListPorps) {
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
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
          'border-0 w-[99%] m-auto h-[95%] bg-transparent text-transparent overflow-hidden',
          'focus:border-primary-blue-200',
          padding,
        )}
        type='text'
        value={value}
        style={{ textIndent: '-9999px' }}
        readOnly
      />
    </li>
  );
}

Dropdown.Service = Service;
Dropdown.Area = Area;
Dropdown.Alram = Alarm;
Dropdown.Profile = Profile;
