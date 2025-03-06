'use client';
import cn from '@/utils/cn';
import { PropsWithChildren, useState } from 'react';
import { C1 } from '../types/type';

interface TooltipProps extends PropsWithChildren {
  open: boolean;
}
export default function Tooltip({ open, children }: TooltipProps) {
  const [o, setO] = useState(open);
  if (o)
    return (
      <div
        className={cn(
          'py-[20px] px-[20px] z-10 max-w-[300px] absolute border-4 border-primary-blue-300 top-1 bg-white rounded-xl',
          o && 'block',
          !o && 'hidden',
        )}
      >
        <CloseBtn
          onClick={() => {
            setO(false);
          }}
        />
        <div className={'text-[#000] text-lg'}>{children}</div>
        <div
          className={`w-0 h-0 absolute 
        top-full left-1/2 -translate-x-1/2
        border-l-[13px] border-l-transparent 
        border-r-[13px] border-r-transparent 
        border-t-[13px] border-t-primary-blue-300`}
        ></div>
        <div
          className={`w-0 h-0 absolute 
        top-full left-1/2 -translate-x-1/2
        border-l-[8px] border-l-transparent 
        border-r-[8px] border-r-transparent 
        border-t-[8px] border-t-white`}
        ></div>
      </div>
    );
}

interface CloseBtnProps extends C1 {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
function CloseBtn({ onClick, className }: CloseBtnProps) {
  const common =
    'absolute w-full h-[2px] rounded-md bg-black-200 top-1/2 transform -translate-y-1/2';
  return (
    <div
      className={cn(`absolute top-1 right-1 w-4 h-4`, !!className && className)}
      onClick={onClick}
    >
      <span className={`${common} rotate-45`}></span>
      <span className={`${common} -rotate-45`}></span>
    </div>
  );
}
