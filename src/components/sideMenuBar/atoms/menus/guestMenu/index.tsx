import CustomLink from '@/components/sideMenuBar/common/customLink';
import SideBarText from '@/components/sideMenuBar/common/sideBarText';

export default function GuestMenu(): JSX.Element {
  return (
    <>
      <CustomLink href='/user/movers'>
        <SideBarText>기사님 찾기</SideBarText>
      </CustomLink>
      <CustomLink href='/select-role'>
        <SideBarText>로그인</SideBarText>
      </CustomLink>
    </>
  );
}
