import { C1 } from '@/lib/types/type';
import cn from '@/utils/cn';
import { type ClassNameValue } from 'tailwind-merge';

interface CtaBtnProps extends C1 {
  type: 'outline' | 'default' | 'primary';
  value: string;
  height: ClassNameValue;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}
export default function CtaBtn({
  value,
  onClick,
  className,
  height,
  type,
}: CtaBtnProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-2xl border-2 border-grayscale-100 overflow-hidden bg-white',
        className && className,
        height && height,
        type === 'outline' && 'border-primary-blue-300',
        type === 'default' && 'border-grayscale-100',
      )}
    >
      <input
        className={cn(
          'w-full rounded-2xl border-0 outline-none ring-transparent text-black-400 font-medium text-lg',
          'focus:outline-none focus:ring-0 focus:ring-transparent',
          height && height,
          type === 'outline' && 'text-primary-blue-300',
          type === 'default' && 'text-black-400',
        )}
        type='text'
        value={value}
        onClick={onClick}
        readOnly
      />
      <div
        className={cn(
          'absolute right-3 top-[50%] w-[10px] h-[10px]',
          'border-r-2 border-t-2 border-black-400',
          'transform -translate-x-1/2 -translate-y-1/2 rotate-[135deg]',
          type === 'outline' &&
            'top-[55%] rotate-[315deg] border-primary-blue-300',
        )}
      ></div>
    </div>
  );
}
