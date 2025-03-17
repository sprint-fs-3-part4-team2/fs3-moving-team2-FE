'use client';

import MenuIcon from '../../atoms/icons/menuIcon';
import Notification from '../../molecules/notification/imdex';
import Profile from '../../molecules/profileSecrion';
import { GNB_RIGHT_SECTION_BOX_STYLES } from './constant';
import { GNBRightSectionProps } from './gnbRightSection.type';

export default function GNBRightSection({
  hasNotification,
  userName,
  imageUrl,
}: GNBRightSectionProps) {
  return (
    <div className={GNB_RIGHT_SECTION_BOX_STYLES}>
      <Notification hasNotification={hasNotification} />
      <Profile
        userName={userName}
        imageUrl={imageUrl ? imageUrl : '/icons/gnb/default-profile.svg'}
      />
      <MenuIcon />
    </div>
  );
}
