'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import MenuIcon from '../../atoms/icons/menuIcon';
import Notification from '../../molecules/notification';
import Profile from '../../molecules/profileSecrion';
import { GNB_RIGHT_SECTION_BOX_STYLES } from './constant';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SideNavigationBar from '@/components/sideMenuBar/organisms';
import { useProfileQuery } from '@/hooks/auth/useProfileQuery';

export default function GNBRightSection() {
  const [isOpenSideNavBar, setIsOpenSideNavBar] = useState<boolean>(false);
  const router = useRouter();
  const { data, isLoading } = useProfileQuery();

  const handleOnClick = () => {
    router.push('/select-role');
  };

  if (isLoading) return null;

  return (
    <div>
      {data ? (
        <div className={GNB_RIGHT_SECTION_BOX_STYLES}>
          <Notification />
          <Profile
            userName={data?.name}
            imageUrl={
              data.profile?.profileImage ?? '/icons/gnb/default-profile.svg'
            }
          />
        </div>
      ) : (
        <div className='w-[116px] hidden md:hidden xl:block'>
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
      <MenuIcon menuOnClick={() => setIsOpenSideNavBar(true)} />
      {isOpenSideNavBar && (
        <SideNavigationBar
          userType={data?.userType ?? 'guest'}
          setIsOpen={setIsOpenSideNavBar}
          isOpen={isOpenSideNavBar}
        />
      )}
    </div>
  );
}
