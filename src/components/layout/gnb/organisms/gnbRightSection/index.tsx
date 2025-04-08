'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import MenuIcon from '../../atoms/icons/menuIcon';
import Notification from '../../molecules/notification';
import Profile from '../../molecules/profileSection';
import { GNB_RIGHT_SECTION_BOX_STYLES } from './constant';
import { GNBRightSectionProps } from './gnbRightSection.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SideNavigationBar from '@/components/sideMenuBar/organisms';
import cn from '@/utils/cn';

export default function GNBRightSection({
  isAuthorized,
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
      {isAuthorized ? (
        <div className={GNB_RIGHT_SECTION_BOX_STYLES}>
          <Notification />
          <Profile
            userName={userName}
            imageUrl={imageUrl ? imageUrl : '/icons/gnb/default-profile.svg'}
          />
          <MenuIcon menuOnClick={() => setIsOpenSideNavBar(true)} />
        </div>
      ) : (
        <div className='w-[116px] flex justify-end'>
          <CommonButton
            onClick={handleOnClick}
            widthType='full'
            heightType='tertiary'
            backgroundColorType='blue'
            borderColorsType='blue'
            className={cn('text-2lg font-semibold', 'hidden', 'xl:block')}
          >
            로그인
          </CommonButton>
          <MenuIcon menuOnClick={() => setIsOpenSideNavBar(true)} />
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
