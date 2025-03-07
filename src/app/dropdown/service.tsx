import cn from '@/utils/cn';
import { DropdownProps } from './dropdown';
import service from '@/constants/service';

export default function Service({ className }: DropdownProps) {
  const liClass = cn(`h-[64px] px-[24px] py-[19px] text-black-400 text-lg`);
  return (
    <ul
      className={cn(
        `bg-white rounded-2xl max-w-[330px] `,
        className && className,
      )}
    >
      <li className={liClass}>전체</li>
      {service.map((v) => {
        return (
          <li
            className={liClass}
            key={v.name}
          >
            {v.name}
          </li>
        );
      })}
    </ul>
  );
}
