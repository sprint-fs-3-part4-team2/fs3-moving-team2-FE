import Image from 'next/image';
import { LOGO_UNAUTHORIZED_STYLES } from './constant';

export default function LogoUnauthorized(): JSX.Element {
  return (
    <div className={LOGO_UNAUTHORIZED_STYLES}>
      <Image
        src={'/img/logo/logo-with-icon.svg'}
        alt='logo with text icon'
        fill
        className='object-contain'
        priority
      />
    </div>
  );
}
