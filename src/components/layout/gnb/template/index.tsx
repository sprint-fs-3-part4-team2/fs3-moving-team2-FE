'use client';

import { usePathname } from 'next/navigation';
import GNBLayout from '../atoms/layout/gnbLayout';
import GNBLogo from '../molecules/gnbLogo';
import GNBMenu from '../molecules/gnbMenu';
import { GNB_LOGO_MENU_STYLES, GNB_STYLES } from './constant';
import dynamic from 'next/dynamic';
import useUserProfile from '@/hooks/auth/useUserProfile';
const GNBRightSection = dynamic(() => import('../organisms/gnbRightSection'), {
  ssr: false,
});

export default function GNB() {
  const pathname = usePathname();
  const { data } = useUserProfile();
  console.log('user profile data: ', data);

  const isAuthorized = data ? true : false;
  const userName = data?.name || '';
  const imageUrl = data?.profile?.imageUrl || '/icons/gnb/default-profile.svg';
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
