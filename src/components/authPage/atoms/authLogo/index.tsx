import Image from 'next/image';
import Link from 'next/link';
import { AUTH_LOGO_STYLES } from '../../styles/variables';

export default function AuthLogo(): JSX.Element {
  return (
    <Link href='/'>
      <div className={AUTH_LOGO_STYLES}>
        <Image
          src='/img/logo/logo-without-icon.svg'
          alt='텍스트만 있는 로고'
          fill
          className='object-contain'
          aria-label='메인 페이지로 이동'
          priority
        />
      </div>
    </Link>
  );
}
