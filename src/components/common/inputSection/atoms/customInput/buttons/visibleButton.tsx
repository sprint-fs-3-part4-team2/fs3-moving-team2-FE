import Image from 'next/image';
import visible from '@/public/icons/visibility/visible.svg';
import invisible from '@/public/icons/visibility/invisible.svg';
import { VisibleButtonProps } from './visibleButton.types';

export default function VisibleButton({
  onClick,
  showPassword,
}: VisibleButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='absolute right-[14px] cursor-pointer'
    >
      <Image
        src={showPassword ? visible : invisible}
        alt='비밀번호 표시 토글 버튼'
      />
    </button>
  );
}
