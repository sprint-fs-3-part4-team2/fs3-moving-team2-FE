'use client';

import { usePathname } from 'next/navigation';
import GNBLayout from '../atoms/layout/gnbLayout';
import GNBLogo from '../molecules/gnbLogo';
import GNBMenu from '../molecules/gnbMenu';
import GNBRightSection from '../organisms/gnbRightSection';
import { GNB_LOGO_MENU_STYLES, GNB_STYLES } from './constant';
import { useUserStore } from '@/store/userStore';

export default function GNB() {
  const pathname = usePathname();
  const { user, isAuthorized } = useUserStore();

  const userName = user?.name || '';
  const imageUrl = user?.imageUrl || '/icons/gnb/default-profile.svg';
  const userType = user?.role || 'guest';

  console.log('user333: ', isAuthorized);
  console.log('username333: ', user, user?.name);

  if (pathname === '/select-role') {
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
