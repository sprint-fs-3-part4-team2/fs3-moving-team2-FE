'use client';

import GNBLayout from '../atoms/layout/gnbLayout';
import GNBLogo from '../molecules/gnbLogo';
import GNBMenu from '../molecules/gnbMenu';
import GNBRightSection from '../organisms/gnbRightSection';
import { GNB_STYLES } from './constant';
import { GNBProps } from './gnb.type';

export default function GNB({
  isUserAuthorized,
  userType,
  userName,
  imageUrl,
  hasNotification,
}: GNBProps) {
  return (
    <div className={GNB_STYLES}>
      <GNBLayout>
        <div className='flex items-center gap-[70px]'>
          <GNBLogo isUserAuthorized={isUserAuthorized} />
          <GNBMenu userType={userType} />
        </div>
        <GNBRightSection
          isUserAuthorized={isUserAuthorized}
          hasNotification={hasNotification}
          userName={userName}
          imageUrl={imageUrl}
          userType={userType}
        />
      </GNBLayout>
    </div>
  );
}
