import cn from '@/utils/cn';
import { PropsWithChildren } from 'react';
import Service from './service';

export interface DropdownProps extends PropsWithChildren {
  className?: string;
}
export default function Dropdown({ className, children }: DropdownProps) {
  return <div className={cn(``, className && className)}>{children}</div>;
}

Dropdown.Service = Service;
