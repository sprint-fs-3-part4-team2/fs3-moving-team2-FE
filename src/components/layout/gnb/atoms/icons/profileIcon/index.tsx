import Image from 'next/image';
import { ProfileIconProp } from './ProfileIxon.type';

export default function ProfileIcon({
  onClick,
  profilImageUrl
}: ProfileIconProp): JSX.Element {
  return (
    <div
      className='relative w-[24px] h-[24px] xl:w-[36px] xl:h-[36px]'
      onClick={onClick}
    >
      <Image
        src={profilImageUrl ? profilImageUrl : '/icons/gnb/default-profile.svg'}
        alt='profile icon'
        fill
        className='object-contain rounded-full'
      />
    </div>
  );
}
