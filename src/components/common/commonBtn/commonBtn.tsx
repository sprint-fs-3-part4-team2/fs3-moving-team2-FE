import type { CommonBtnProps } from '@/components/common/commonBtn/btn.types';
import cn from '@/utils/cn';

const backgroundColors = {
  blue: 'bg-primary-blue-300',
  white: 'bg-white',
  gray: 'bg-grayscale-200',
  dynamic: '',
};

const textColors = {
  white: 'text-gray-50',
  gray: 'text-grayscale-300',
  black: 'text-black',
  blue: 'text-primary-blue-300',
  dynamic: '',
};

const borderColors = {
  blue: 'border-[1px] border-primary-blue-300',
  gray: 'border-[1px] border-grayscale-100',
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
        backgroundColors[backgroundColorType] || 'bg-blue',
        textColors[textColorType] || 'text-white',
        borderColorsType !== 'none' ? borderColors[borderColorsType] : '',
        'rounded-2xl text-base md:text-base xl:text-xl cursor-pointer font-semibold',

        {
          'w-full': widthType === 'full',
          'w-1/2': widthType === 'half',
          dynamic: widthType === 'dynamic',
        },
        {
          'h-[54px] md:h-[54px] xl:h-[64px]': heightType === 'primary',
          'h-[48px] md:h-[48px] xl:h-[64px]': heightType === 'secondary',
          'h-[44px]': heightType === 'tertiary',
        },
        'disabled:bg-grayscale-100 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
