import CustomLink from '@/components/sideMenuBar/common/customLink';
import SideBarText from '@/components/sideMenuBar/common/sideBarText';

export default function UserMenu(): JSX.Element {
  return (
    <>
      <CustomLink href='/user/quotes/request'>
        <SideBarText>견적 요청</SideBarText>
      </CustomLink>
      <CustomLink href='/user/movers'>
        <SideBarText>기사님 찾기</SideBarText>
      </CustomLink>
      <CustomLink href='/user/quotes/pending'>
        <SideBarText>내 견적 관리</SideBarText>
      </CustomLink>
    </>
  );
}
