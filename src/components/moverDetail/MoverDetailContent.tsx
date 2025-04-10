import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ServiceBadge from '@/components/common/shared/atoms/serviceBadge';
import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import { MoverDetail } from '@/services/moverService';
import { MOVING_TYPES } from '@/constants/movingTypes';

interface MoverDetailContentProps {
  moverDetail: MoverDetail;
}

export default function MoverDetailContent({
  moverDetail,
}: MoverDetailContentProps) {
  return (
    <>
      <div className='gap-0 px-6'>
        <PageHeader>상세설명</PageHeader>
        <p className='text-2lg text-[18px] font-regular'>
          {moverDetail.description}
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
        <div className='flex flex-wrap gap-3'>
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
      <HorizontalDivider />
    </>
  );
}
