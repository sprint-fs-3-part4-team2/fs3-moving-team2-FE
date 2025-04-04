'use client';

import { usePathname } from 'next/navigation';
import GNBLayout from '../atoms/layout/gnbLayout';
import GNBLogo from '../molecules/gnbLogo';
import GNBMenu from '../molecules/gnbMenu';
import { GNB_LOGO_MENU_STYLES, GNB_STYLES } from './constant';
import dynamic from 'next/dynamic';
import useUserProfile from '@/hooks/auth/useUserProfile';
import CustomLink from '../atoms/menus/common/customLink';
import Text from '../atoms/menus/common/gnbText';
const GNBRightSection = dynamic(() => import('../organisms/gnbRightSection'), {
  ssr: false,
});

export default function GNB() {
  const pathname = usePathname();
  const { data } = useUserProfile();
  console.log('user data: ', data);

  const isAuthorized = data ? true : false;
  const userName = data?.name || '';
  const imageUrl =
    data?.profile?.profileImage || '/icons/gnb/default-profile.svg';
  const userType = data?.userType || 'guest';

  const hidePathnames = [
    '/select-role',
    '/mover/sign-in',
    '/mover/sign-up',
    '/user/sign-in',
    '/user/sign-up',
  ];
  if (hidePathnames.includes(pathname)) {
    return null;
  }

  return (
    <div className={GNB_STYLES}>
      <GNBLayout>
        <div className={GNB_LOGO_MENU_STYLES}>
          <GNBLogo isAuthorized={isAuthorized} />
          <GNBMenu userType={userType} />
        </div>
        {/* 테스트 페이지 이동 */}
        <CustomLink href='/user/sign-in'>
          <Text linkHref='/user/sign-in'>로그인</Text>
        </CustomLink>

        <CustomLink href='/user/sign-up'>
          <Text linkHref='/user/sign-up'>회원가입</Text>
        </CustomLink>

        <div className='flex flex-col'>
          <CustomLink href='/user/profile/register'>
            <Text linkHref='/user/profile/register'>일반 프로필 등록</Text>
          </CustomLink>
          <CustomLink href='/mover/profile/register'>
            <Text linkHref='/mover/profile/register'>기사님 프로필 등록</Text>
          </CustomLink>
        </div>

        <CustomLink href='/mover/profile/edit'>
          <Text linkHref='/mover/profile/edit'>기사님 프로필 수정</Text>
        </CustomLink>

        <CustomLink href='/mover/profile'>
          <Text linkHref='/mover/profile'>기사님 마이페이지</Text>
        </CustomLink>

        <GNBRightSection
          isAuthorized={isAuthorized}
          userName={userName}
          imageUrl={imageUrl}
          userType={userType}
        />
      </GNBLayout>
    </div>
  );
}
