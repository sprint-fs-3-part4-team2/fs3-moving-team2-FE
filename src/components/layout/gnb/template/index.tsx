'use client';

import { usePathname } from 'next/navigation';
import GNBLayout from '../atoms/layout/gnbLayout';
import GNBLogo from '../molecules/gnbLogo';
import GNBMenu from '../molecules/gnbMenu';
import GNBRightSection from '../organisms/gnbRightSection';
import { GNB_LOGO_MENU_STYLES, GNB_STYLES } from './constant';
import { GNBProps } from './gnb.type';

export default function GNB({
  isAuthorized,
  userType,
  userName,
  imageUrl,
  hasNotification,
}: GNBProps) {
  const pathname = usePathname();

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
          hasNotification={hasNotification}
          userName={userName}
          imageUrl={imageUrl}
          userType={userType}
        />
      </GNBLayout>
    </div>
  );
}
