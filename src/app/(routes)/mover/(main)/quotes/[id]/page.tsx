import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ShareButtons from '@/components/common/ShareButtons';
import CustomerInfo from '@/components/common/customerInfo/templates/customerInfo';
import QuoteCard from '@/components/quoteCard/molecules/quoteCard';

export default function Page() {
  return (
    <div className='relative flex flex-col mx-auto w-full items-center px-6 md:px-[72px] xl:px-0 max-w-[1400px]'>
      <div className='w-full'>
        <PageHeader>견적 상세</PageHeader>
      </div>
      <div className='flex w-full gap-[117px]'>
        <div className='flex flex-col gap-10 w-full'>
          <CustomerInfo
            quoteId='1'
            variant='submitted'
            movingType={['small']}
            quoteState='confirmedQuote'
            isCustomQuote={true}
            customerName='김인서'
            movingDate={new Date()}
            arrival='경기 김포'
            departure='서울 중구'
            completed={false}
            declined={false}
          />
          <div className='flex-col gap-10 flex md:flex xl:hidden'>
            <ShareButtons text='견적서 공유하기' />
            <HorizontalDivider />
          </div>
          <QuoteCard quotePrice={50000}>견적가</QuoteCard>
          <HorizontalDivider />
          <MovingInfo
            requestedDate={new Date()}
            movingDate={new Date()}
            departure='서울 중구'
            arrival='경기 김포'
            movingType='소형이사'
          />
        </div>
        <div className='w-[328px] gap-[40px] hidden md:hidden xl:flex flex-col'>
          <ShareButtons text='견적서 공유하기' />
        </div>
      </div>
    </div>
  );
}
