import Image from 'next/image';
import { LOGO_WITH_TEXT_STYLES, LOGO_ONLY_STYLES } from './constant';

export default function LogoAuthorized(): JSX.Element {
  return (
    <div>
      <div className={LOGO_WITH_TEXT_STYLES}>
        <Image
          src={'/img/logo/logo-with-icon.svg'}
          alt='only logo icon'
          fill
          className='object-contain'
          priority
        />
      </div>
      <div className={LOGO_ONLY_STYLES}>
        <Image
          src={'/img/logo/logo-only-icon.svg'}
          alt='only logo icon'
          fill
          className='object-contain'
          priority
        />
      </div>
    </div>
  );
}
