import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import CommonBtn from '@/components/common/commonBtn/commonBtn';
import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ShareButtons from '@/components/common/ShareButtons';
import QuoteCard from '@/components/quoteCard/molecules/quoteCard';

export default function Page() {
  return (
    <div className='relative flex flex-col mx-auto w-full items-center overflow-auto pb-24'>
      <div className='flex w-full px-6 md:px-[72px] xl:px-[100px] max-w-[1600px]'>
        <PageHeader>견적 상세</PageHeader>
      </div>
      <div className='flex w-full px-6 md:px-[72px] xl:px-[100px] max-w-[1600px] gap-[117px]'>
        <div className='flex flex-col gap-10 w-full'>
          <MoverInfo
            variant='quote'
            subVariant='completed'
            moverName='김코드'
            imageUrl={null}
            movingType={['small']}
            isCustomQuote={true}
            quoteState='confirmedQuote'
            rating={5}
            experienceYears={10}
            quoteCount={5000}
            favoriteCount={500}
            ratingCount={5000}
            isFavoriteMoverList={false}
            description='고객님의 물품을 안전하게 운송해 드립니다.'
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
          <CommonBtn
            widthType='full'
            heightType='primary'
            backgroundColorType='blue'
            textColorType='white'
          >
            견적 확정하기
          </CommonBtn>
          <HorizontalDivider />
          <ShareButtons text='견적서 공유하기' />
        </div>
      </div>
      <div className='fixed md:fixed xl:hidden bottom-0 left-0 right-0 w-full px-6 md:px-[72px] max-w-[1400px] mx-auto py-[10px] border-t border-t-gray-50 bg-white'>
        <CommonBtn
          widthType='full'
          heightType='primary'
          backgroundColorType='blue'
          textColorType='white'
        >
          견적 확정하기
        </CommonBtn>
      </div>
    </div>
  );
}
