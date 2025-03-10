import cn from '@/utils/cn';
import { ProfileImageProps } from './profileImage.types';
import Image from 'next/image';
import defaultProfile from '@/public/icons/gnb/default-profile.svg';

export default function ProfileImage({
  imageUrl,
  className,
}: ProfileImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full border-2 border-primary-blue-400 flex items-center flex-shrink-0',
        className,
      )}
    >
      <Image
        className={cn('object-cover', className)}
        src={imageUrl ?? defaultProfile}
        fill
        alt='프로필 이미지'
      />
    </div>
  );
}
