'use client';
import cn from '@/utils/cn';
import { CSSProperties, PropsWithChildren, useState } from 'react';

interface TooltipProps extends PropsWithChildren {
  open: boolean;
  top?: CSSProperties['top'];
  left?: CSSProperties['bottom'];
  right?: CSSProperties['right'];
  bottom?: CSSProperties['bottom'];
  closeBtn?: boolean;
}
export default function Tooltip({
  open,
  children,
  top,
  left,
  right,
  bottom,
  closeBtn = false,
}: TooltipProps) {
  const [o, setO] = useState(open);
  if (o)
    return (
      <div
        className={cn(
          'py-[10px] px-[20px] z-10 max-w-[300px] absolute border-4 border-primary-blue-300  bg-white rounded-2xl',
          o && 'block',
          !o && 'hidden',
          'animate-bounce',
        )}
        style={{
          top,
          left,
          right,
          bottom,
        }}
      >
        {closeBtn && (
          <CloseBtn
            onClick={() => {
              setO(false);
            }}
          />
        )}
        <div className={'text-[#444] text-md font-semibold'}>{children}</div>
        <div
          className={`w-0 h-0 absolute 
        top-full left-1/2 -translate-x-1/2
        border-l-[12px] border-l-transparent 
        border-r-[12px] border-r-transparent 
        border-t-[12px] border-t-primary-blue-300`}
        ></div>
        <div
          className={`w-0 h-0 absolute 
        top-[97%] left-1/2 -translate-x-1/2
        border-l-[8px] border-l-transparent 
        border-r-[8px] border-r-transparent 
        border-t-[8px] border-t-white`}
        ></div>
      </div>
    );
}

interface CloseBtnProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}
export function CloseBtn({ onClick, className }: CloseBtnProps) {
  const common =
    'absolute w-full h-[2px] rounded-md bg-black-100 top-1/2 transform -translate-y-1/2 transition-all duration-500';
  return (
    <div
      className={cn(
        `absolute top-1 right-1 w-[14px] h-[14px] group`,
        !!className && className,
      )}
      onClick={onClick}
    >
      <span
        className={`${common} rotate-45 group-hover:bg-primary-blue-300`}
      ></span>
      <span
        className={`${common} -rotate-45 group-hover:bg-primary-blue-300 `}
      ></span>
    </div>
  );
}
