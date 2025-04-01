import cn from '@/utils/cn';
import Image from 'next/image';

interface RoleImgProps {
  src: string;
  className?: string;
}
export default function RoleImg({ src, className = '' }: RoleImgProps) {
  return (
    <li
      className={cn(
        `bg-white rounded-md group w-[300px] relative flex items-center justify-center`,
        !!className && className,
      )}
    >
      <div
        className={cn(
          `flex items-center justify-center w-[300px] overflow-hidden rounded-lg`,
        )}
      >
        <div className={`transition-all duration-500`}>
          <Image
            className={``}
            src={src}
            alt='이미지'
            width={300}
            height={200}
          />
        </div>
      </div>
    </li>
  );
}
