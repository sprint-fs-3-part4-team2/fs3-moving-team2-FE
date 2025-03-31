import Image from 'next/image';
import { AUTH_LOGO_STYLES } from './constant';
import Link from 'next/link';

export default function AuthLogo(): JSX.Element {
  return (
    <Link href='/'>
      <div className={AUTH_LOGO_STYLES}>
        <Image
          src='/img/logo/logo-without-icon.svg'
          alt='Logo only Text'
          fill
          className='object-contain'
          priority
        />
      </div>
    </Link>
  );
}
