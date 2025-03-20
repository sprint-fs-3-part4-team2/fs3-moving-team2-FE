import cn from '@/utils/cn';
import { ChildrenProp } from '../../common.types';

export default function CustomText({ children }: ChildrenProp) {
  return (
    <span
      className={cn(
        'text-xs text-black-100 font-regular',
        'xl:text-xl xl:text-black-200',
      )}
    >
      {children}
    </span>
  );
}
