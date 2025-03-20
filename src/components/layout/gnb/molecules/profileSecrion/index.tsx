import { useState } from 'react';
import ProfileIcon from '../../atoms/icons/profileIcon';
import { PROFILE_NAME_STYLES, PROFILE_STYLES } from './constant';
import { ProfileSecrionProps } from './profileSecrion.type';
import Profile from '@/components/dropdown/children/profile';

export default function ProfileSecrion({
  userName,
  imageUrl,
}: ProfileSecrionProps) {
  return (
    <Profile className=''>
      <div className={PROFILE_STYLES}>
        <ProfileIcon profilImageUrl={imageUrl} />
        <span className={PROFILE_NAME_STYLES}>{userName}</span>
      </div>
    </Profile>
  );
}
