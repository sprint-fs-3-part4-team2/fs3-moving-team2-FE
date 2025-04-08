import Image from 'next/image';
import Link from 'next/link';
import { AUTH_LOGO_STYLES } from '../../styles/variables';

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
