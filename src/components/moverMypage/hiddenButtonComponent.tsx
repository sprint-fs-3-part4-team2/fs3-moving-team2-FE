import Image from 'next/image';
import CommonButton from '../common/commonBtn/commonBtn';

export interface HiddenButtonProps {
  onEditClick?: () => void;
  onInfoEdit?: () => void;
}

export default function HiddenButton({
  onEditClick,
  onInfoEdit,
}: HiddenButtonProps) {
  return (
    <div className='flex flex-col sm:flex-row md:hidden gap-[16px] mt-[10px] w-full'>
      <CommonButton
        widthType='half' // 기본값은 half
        heightType='secondary'
        backgroundColorType='dynamic'
        borderColorsType='gray'
        textColorType='gray'
        className='w-full sm:w-1/2 bg-bg-[var(--background-200)]'
      >
        <div
          className='flex items-center justify-center gap-2 cursor-pointer'
          onClick={onInfoEdit}
        >
          기본 정보 수정
          <Image
            src='/icons/edit.svg'
            alt='수정 아이콘'
            width={24}
            height={24}
            className='grayscale brightness-50'
          />
        </div>
      </CommonButton>

      <CommonButton
        widthType='half'
        heightType='secondary'
        backgroundColorType='blue'
        borderColorsType='none'
        textColorType='white'
        className='w-full sm:w-1/2'
      >
        <div
          className='flex items-center justify-center gap-2'
          onClick={onEditClick}
        >
          내 프로필 수정
          <Image
            src='/icons/edit.svg'
            alt='수정 아이콘'
            width={24}
            height={24}
          />
        </div>
      </CommonButton>
    </div>
  );
}
