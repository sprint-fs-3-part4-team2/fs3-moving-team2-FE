import { PropsWithChildren } from 'react';
import Link from 'next/link';
import cn from '@/utils/cn';

interface MobileLinkProps extends PropsWithChildren {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}
export default function MobileLink({ children, onClick }: MobileLinkProps) {
  return (
    <Link
      className={cn(
        'md:hidden',
        'py-2 px-3 rounded-md mt-[30px] block text-xl font-semibold transition-all duration-300',
        'hover:text-black-500 text-bold text-[20px]',
      )}
      style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}
      href={'#'}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
