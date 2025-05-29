import Logo from '../../atoms/logos/logoAuthorized';
import CustomLink from '../../atoms/menus/common/customLink';

export default function GNBLogo() {
  return (
    <CustomLink href='/'>
      <Logo />
    </CustomLink>
  );
}
