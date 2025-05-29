import CommonButton from '@/components/common/commonBtn/commonBtn';
import ShareButtons from '@/components/common/ShareButtons';
import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import Image from 'next/image';
import filledHeart from '@/public/icons/favorite/filled.svg';
import redFilledHeart from '@/public/icons/favorite/red-filled.svg';

interface MoverDetailSidebarProps {
  moverName: string;
  isFavorite: boolean;
  isQuoteRequested: boolean;
  onToggleFavorite: () => void;
  onQuoteRequest: () => void;
}

export default function MoverDetailSidebar({
  moverName,
  isFavorite,
  isQuoteRequested,
  onToggleFavorite,
  onQuoteRequest,
}: MoverDetailSidebarProps) {
  return (
    <div className='w-[354px] gap-[40px] hidden md:hidden xl:flex flex-col'>
      <p className='text-xl font-semibold'>
        {moverName} 기사님에게 지정 견적을 요청해보세요!
      </p>

      <CommonButton
        widthType='full'
        heightType='primary'
        backgroundColorType='white'
        textColorType='black'
        borderColorsType='gray'
        className='flex items-center justify-center gap-2'
        onClick={onToggleFavorite}
      >
        <Image
          src={isFavorite ? redFilledHeart : filledHeart}
          alt='찜하기'
          width={24}
          height={24}
        />
        기사님 찜하기
      </CommonButton>

      <CommonButton
        widthType='full'
        heightType='primary'
        backgroundColorType={isQuoteRequested ? 'gray' : 'blue'}
        textColorType='white'
        onClick={onQuoteRequest}
        disabled={isQuoteRequested}
      >
        {isQuoteRequested ? '지정 견적 요청 완료' : '지정 견적 요청하기'}
      </CommonButton>

      <HorizontalDivider />
      <ShareButtons text='나만 알기엔 아쉬운 기사님인가요?' />
    </div>
  );
}
