import { GNBLogoProps } from './gnbLogo.type';
import LogoUnauthorized from '../../atoms/logos/logoUnauthorized';
import LogoAuthorized from '../../atoms/logos/logoAuthorized';
import Link from 'next/link';

export default function GNBLogo({
  isUserAuthorized,
}: GNBLogoProps): JSX.Element {
  return (
    <Link href='/'>
      {isUserAuthorized ? <LogoAuthorized /> : <LogoUnauthorized />}
    </Link>
  );
}
