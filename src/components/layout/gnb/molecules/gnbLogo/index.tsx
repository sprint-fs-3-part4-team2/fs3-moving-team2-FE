import { GNBLogoProps } from './gnbLogo.type';
import LogoUnauthorized from '../../atoms/logos/logoUnauthorized';
import LogoAuthorized from '../../atoms/logos/logoAuthorized';
import CustomLink from '../../atoms/menus/common/customLink';

export default function GNBLogo({
  isUserAuthorized,
}: GNBLogoProps): JSX.Element {
  return (
    <CustomLink href='/'>
      {isUserAuthorized ? <LogoAuthorized /> : <LogoUnauthorized />}
    </CustomLink>
  );
}
