import cn from '@/utils/cn';
import { MoverNameProps } from '@/components/common/moverInfo/atoms/moverName/moverName.types';

export default function MoverName({
  sizeVariant,
  moverName,
  className,
}: MoverNameProps) {
  return (
    <div
      className={cn(
        'flex text-black-300 font-semibold gap-1 md:gap-1 xl:gap-2',
        sizeVariant === 'primary' &&
          'text-[14px] md:text-[14px] xl:text-[24px]',
        sizeVariant === 'secondary' &&
          'text-[14px] md:text-[14px] xl:text-[18px]',
        sizeVariant === 'tertiary' && 'text-[14px]',
        className,
      )}
    >
      <span>{moverName}</span>
    </div>
  );
}
