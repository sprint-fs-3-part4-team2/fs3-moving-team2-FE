export default function SubmittedQuotesSkeleton() {
  return (
    <div className='h-[1080px] mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 max-w-[1400px] w-full px-6 md:px-[72px] xl:px-0 mx-auto gap-[24px] gap-y-12'>
        {Array.from({ length: 6 }, () => 0).map((val, index) => {
          return (
            <div
              key={val + index}
              className='flex flex-col w-full md:w-full xl:w-full h-[244px] md:h-[206px] xl:h-[272px] shadow-primary rounded-[16px] bg-white px-4 md:px-4 xl:px-6 py-4 md:py-4 xl:py-5'
            >
              <div className='w-[61px] md:w-[61px] xl:w-[72px] h-[26px] md:h-[26px] xl:h-[34px] animate-pulse mt-4 md:mt-4 xl:mt-[22px] bg-grayscale-100 rounded-[10px]' />
              <div className='w-[88px] md:w-[88px] xl:w-[112px] h-[26px] md:h-[26px] xl:h-[32px] animate-pulse mt-4 md:mt-4 xl:mt-[22px] bg-grayscale-100 rounded-[10px]' />
              <div className='w-[459px] md:w-[459px] xl:w-[556px] h-[28px] md:h-[28px] xl:h-[34px] animate-pulse mt-[26px] md:mt-[26px] xl:mt-[36px] bg-grayscale-100 rounded-[10px]' />
              <div className='w-full flex justify-end mt-[26px] md:mt-[26px] xl:mt-[36px] rounded-[10px]'>
                <div className='w-[148px] md:w-[148px] xl:w-[200px] h-[26px] md:h-[26px] xl:h-[40px] animate-pulse bg-grayscale-100 rounded-[10px]' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
