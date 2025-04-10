import CustomLink from '@/components/sideMenuBar/common/customLink';
import SideBarText from '@/components/sideMenuBar/common/sideBarText';

export default function MoverMenu(): JSX.Element {
  return (
    <>
      <CustomLink href='/mover/quotes/requested'>
        <SideBarText>받은 요청</SideBarText>
      </CustomLink>
      <CustomLink href='/mover/quotes/submitted'>
        <SideBarText>내 견적 관리</SideBarText>
      </CustomLink>
    </>
  );
}
