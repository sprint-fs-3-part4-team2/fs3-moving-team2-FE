import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import ShareButtons from '@/components/common/ShareButtons';
import { MoverDetail } from '@/services/moverService';

interface MoverDetailHeaderProps {
  moverDetail: MoverDetail;
}

export default function MoverDetailHeader({
  moverDetail,
}: MoverDetailHeaderProps) {
  return (
    <>
      <MoverInfo
        variant='quote'
        subVariant='completed'
        moverName={moverDetail.moverName}
        imageUrl={moverDetail.imageUrl}
        movingType={moverDetail.movingType}
        isCustomQuote={moverDetail.isCustomQuote}
        rating={moverDetail.rating ?? 0}
        experienceYears={moverDetail.experienceYears}
        quoteCount={moverDetail.quoteCount}
        favoriteCount={moverDetail.favoriteCount ?? 0}
        ratingCount={moverDetail.ratingCount}
        isFavorite={moverDetail.isFavorite}
        isFavoriteMoverList={false}
        description={moverDetail.introduction}
      />
      {/* 모바일 */}
      <div className='flex-col gap-10 pl-6 flex md:flex xl:hidden'>
        <ShareButtons text='나만 알기엔 아쉬운 기사님인가요?' />
      </div>
    </>
  );
}
