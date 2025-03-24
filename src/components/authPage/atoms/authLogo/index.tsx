import Image from 'next/image';
import { AUTH_LOGO_STYLES } from './constant';
import Link from 'next/link';

export default function AuthLogo(): JSX.Element {
  return (
    <div className={AUTH_LOGO_STYLES}>
      <Link href='/'>
        <Image
          src='/img/logo/logo-without-icon.svg'
          alt='Logo only Text'
          fill
          className='object-contain'
        />
      </Link>
    </div>
  );
}
