import CommonButton from '@/components/common/commonBtn/commonBtn';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';

export default function Page() {
  return (
    <div className='relative flex flex-col mx-auto w-full items-center overflow-auto pb-24'>
      <div className='w-full max-w-[1400px] px-6 md:px-[72.5px] xl:px-0 flex justify-between gap-[127px] mt-8 md:mt-8 xl:mt-10'>
        <div className='w-full'>
          <MovingInfo
            movingDate={new Date()}
            movingType={'소형이사'}
            requestedDate={new Date()}
            arrival='서울시 중구'
            departure='경기도 김포'
          />
        </div>
        <div className='w-[328px] hidden md:hidden xl:block'>
          <CommonButton
            widthType='full'
            heightType='primary'
          >
            견적 취소하기
          </CommonButton>
        </div>
      </div>
      <div className='fixed md:fixed xl:hidden bottom-0 left-0 right-0 w-full px-6 md:px-[72px] max-w-[1400px] mx-auto py-[10px] border-t border-t-gray-50 bg-white'>
        <CommonButton
          widthType='full'
          heightType='primary'
        >
          견적 취소하기
        </CommonButton>
      </div>
    </div>
  );
}
