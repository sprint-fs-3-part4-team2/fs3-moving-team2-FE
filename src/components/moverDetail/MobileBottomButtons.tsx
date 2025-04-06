import CommonButton from '@/components/common/commonBtn/commonBtn';
import Image from 'next/image';
import filledHeart from '@/public/icons/favorite/filled.svg';
import redFilledHeart from '@/public/icons/favorite/red-filled.svg';

interface MobileBottomButtonsProps {
  isFavorite: boolean;
  isQuoteRequested: boolean;
  onToggleFavorite: () => void;
  onQuoteRequest: () => void;
}

export default function MobileBottomButtons({
  isFavorite,
  isQuoteRequested,
  onToggleFavorite,
  onQuoteRequest,
}: MobileBottomButtonsProps) {
  return (
    <div className='fixed md:fixed xl:hidden bottom-0 left-0 right-0 w-full px-[72px] max-w-[1400px] mx-auto py-[10px] border-t border-t-gray-50 bg-white'>
      <div className='flex gap-2'>
        <CommonButton
          widthType='dynamic'
          heightType='primary'
          backgroundColorType='white'
          textColorType='black'
          borderColorsType='gray'
          className='flex items-center justify-center p-[15px]'
          onClick={onToggleFavorite}
        >
          <Image
            src={isFavorite ? redFilledHeart : filledHeart}
            alt='찜하기'
            width={28}
            height={28}
          />
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
      </div>
    </div>
  );
}
