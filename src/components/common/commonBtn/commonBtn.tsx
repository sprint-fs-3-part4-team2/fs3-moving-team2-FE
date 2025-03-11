import type { CommonBtnProps } from '@/components/common/commonBtn/btn.types';
import cn from '@/utils/cn';

const backgroundColors = {
  blue: 'bg-primary-blue-300',
  white: 'bg-gray-50',
  gray: 'bg-gray-100',
  dynamic: '',
};

const textColors = {
  white: 'text-gray-50',
  gray: 'text-gray-300',
  black: 'text-black',
  blue: 'text-primary-blue-300',
  dynamic: '',
};

const borderColors = {
  blue: 'border-primary-blue-300',
  gray: 'border-gray-300',
  none: '',
};

export default function CommonButton({
  widthType = 'full',
  heightType = 'primary',
  backgroundColorType = 'blue',
  textColorType = 'white',
  borderColorsType = 'none',
  type = 'button',
  className,
  children,
  ...props
}: Readonly<CommonBtnProps>) {
  return (
    <button
      type={type}
      className={cn(
        'bg-primary-blue-300  rounded-2xl text-[20px] text-white',
        'cursor-pointer',
        {
          'w-full': widthType === 'full',
          'w-1/2': widthType === 'half',
        },
        {
          'h-[54px] md:h-[54px] xl:h-[64px]': heightType === 'primary',
          'h-[48px] md:h-[48px] xl:h-[64px]': heightType === 'secondary',
          'h-[44px]': heightType === 'tertiary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
