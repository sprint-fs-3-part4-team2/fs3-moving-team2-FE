import { PropsWithChildren } from 'react';
import s from './style/mobile-link.module.css';
import Link from 'next/link';

interface MobileLinkProps extends PropsWithChildren {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}
export default function MobileLink({ children, onClick }: MobileLinkProps) {
  return (
    <Link
      className={s.mobileLink}
      href={'#'}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
