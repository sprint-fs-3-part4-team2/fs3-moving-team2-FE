import Image from 'next/image';
import {
  LOGO_ONLY_STYLES,
  LOGO_WITH_TEXT_STYLES,
} from '../../../styles/variables';

export default function Logo() {
  return (
    <div>
      <div className={LOGO_WITH_TEXT_STYLES}>
        <Image
          src={'/img/logo/logo-with-icon.svg'}
          alt='텍스트가 있는 무빙 아이콘'
          fill
          className='object-contain'
          aria-label='메인 페이지로 이동'
          priority
        />
      </div>
      <div className={LOGO_ONLY_STYLES}>
        <Image
          src={'/img/logo/logo-only-icon.svg'}
          alt='텍스트가 없는 무빙 아이콘'
          fill
          className='object-contain'
          aria-label='메인 페이지로 이동'
          priority
        />
      </div>
    </div>
  );
}
