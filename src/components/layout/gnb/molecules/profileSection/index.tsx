import ProfileIcon from '../../atoms/icons/profileIcon';
import { PROFILE_NAME_STYLES, PROFILE_STYLES } from '../../styles/variables';
import { ProfileSectionProps } from './profileSection.type';
import Profile from '@/components/dropdown/children/profile';

export default function ProfileSection({
  userName,
  imageUrl,
}: ProfileSectionProps) {
  return (
    <Profile className=''>
      <div className={PROFILE_STYLES}>
        <ProfileIcon profilImageUrl={imageUrl} />
        <span className={PROFILE_NAME_STYLES}>{userName}</span>
      </div>
    </Profile>
  );
}
