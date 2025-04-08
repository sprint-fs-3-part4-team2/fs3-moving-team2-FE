'use client';

import { usePathname } from 'next/navigation';
import GNBLayout from '../atoms/layout/gnbLayout';
import GNBLogo from '../molecules/gnbLogo';
import dynamic from 'next/dynamic';
import useUserProfile from '@/hooks/auth/useUserProfile';
import { GNB_LOGO_MENU_STYLES, GNB_STYLES } from '../styles/variables';

const GNBRightSection = dynamic(() => import('../organisms/gnbRightSection'), {
  ssr: false,
});
const GNBMenu = dynamic(() => import('../molecules/gnbMenu'));

export default function GNB() {
  const pathname = usePathname();
  const { data, isFetched } = useUserProfile();

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
          <GNBLogo isAuthorized={true} />
          <GNBMenu userType={userType} />
        </div>
        {isFetched && (
          <GNBRightSection
            isAuthorized={isAuthorized}
            userName={userName}
            imageUrl={imageUrl}
            userType={userType}
          />
        )}
      </GNBLayout>
    </div>
  );
}
