'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import MenuIcon from '../../atoms/icons/menuIcon';
import Notification from '../../molecules/notification/imdex';
import Profile from '../../molecules/profileSecrion';
import { GNB_RIGHT_SECTION_BOX_STYLES } from './constant';
import { GNBRightSectionProps } from './gnbRightSection.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SideNavigationBar from '@/components/sideMenuBar/organisms';

export default function GNBRightSection({
  isUserAuthorized,
  hasNotification,
  userName,
  imageUrl,
  userType,
}: GNBRightSectionProps) {
  const [isOpenSideNavBar, setIsOpenSideNavBar] = useState<boolean>(false);
  const router = useRouter();

  const handleOnClick = () => {
    router.push('/select-role');
  };

  return (
    <div>
      {isUserAuthorized ? (
        <div className={GNB_RIGHT_SECTION_BOX_STYLES}>
          <Notification hasNotification={hasNotification} />
          <Profile
            userName={userName}
            imageUrl={imageUrl ? imageUrl : '/icons/gnb/default-profile.svg'}
          />
          <MenuIcon menuOnClick={() => setIsOpenSideNavBar(true)} />
        </div>
      ) : (
        <div className='w-[116px]'>
          <CommonButton
            onClick={handleOnClick}
            widthType='full'
            heightType='tertiary'
            backgroundColorType='blue'
            borderColorsType='blue'
            className='text-2lg font-semibold'
          >
            로그인
          </CommonButton>
        </div>
      )}
      {isOpenSideNavBar && (
        <SideNavigationBar
          userType={userType}
          setIsOpen={setIsOpenSideNavBar}
          isOpen={isOpenSideNavBar}
        />
      )}
    </div>
  );
}
