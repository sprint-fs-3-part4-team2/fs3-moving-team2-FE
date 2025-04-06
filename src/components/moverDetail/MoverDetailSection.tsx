import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ServiceBadge from '@/components/common/shared/atoms/serviceBadge';
import ShareButtons from '@/components/common/ShareButtons';
import { MoverDetail } from '@/services/types/mover';
import { MOVING_TYPES } from '@/constants/movingTypes';

interface MoverDetailSectionProps {
  moverDetail: MoverDetail;
}

export default function MoverDetailSection({
  moverDetail,
}: MoverDetailSectionProps) {
  return (
    <div className='flex flex-col gap-10 w-full flex-1'>
      <MoverInfo
        variant='quote'
        subVariant='completed'
        moverName={moverDetail.moverName}
        imageUrl={moverDetail.imageUrl}
        movingType={moverDetail.movingType}
        isCustomQuote={moverDetail.isCustomQuote}
        rating={moverDetail.rating}
        experienceYears={moverDetail.experienceYears}
        quoteCount={moverDetail.quoteCount}
        favoriteCount={moverDetail.favoriteCount}
        ratingCount={moverDetail.ratingCount}
        isFavorite={moverDetail.isFavorite}
        isFavoriteMoverList={false}
        description={moverDetail.description}
      />
      {/* 모바일 */}
      <div className='flex-col gap-10 pl-6 flex md:flex xl:hidden'>
        <ShareButtons text='나만 알기엔 아쉬운 기사님인가요?' />
      </div>
      <HorizontalDivider />

      <div className='gap-0 px-6'>
        <PageHeader>상세설명</PageHeader>
        <p className='text-2lg text-[18px] font-regular'>
          {moverDetail.introduction}
        </p>
      </div>
      <HorizontalDivider />

      <div className='gap-0 px-6'>
        <PageHeader>제공 서비스</PageHeader>
        <div className='flex gap-3'>
          {moverDetail.movingType.map((type, index) => (
            <ServiceBadge
              key={index}
              color='blue'
            >
              {MOVING_TYPES[type].value}
            </ServiceBadge>
          ))}
        </div>
      </div>
      <HorizontalDivider />

      <div className='gap-0 px-6'>
        <PageHeader>서비스 가능 지역</PageHeader>
        <div className='flex gap-3'>
          {moverDetail.regions.map((region, index) => (
            <ServiceBadge
              key={index}
              color='gray'
            >
              {region}
            </ServiceBadge>
          ))}
        </div>
      </div>
    </div>
  );
}
