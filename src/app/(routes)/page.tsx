import Image from 'next/image';

export default function Home() {
  return (
    <div className='animate-fadeIn w-[439px] w-full min-h-screen bg-[var(--background-400)] flex flex-col items-center'>
      <h1 className='animate-fadeIn w-[439px] font-semibold text-[36px] leading-[50px] mt-20 text-[var(--black-500)] text-center'>
        원하는 이사 서비스를 요청하고 견적을 받아보세요
      </h1>

      {/* Main Grid */}
      <div className='mt-[40px] mb-[100px] grid grid-cols-3 gap-[24px] cursor-pointer'>
        {/* 세로 박스 */}
        <div
          className={`w-[432px] h-[589px] col-span-1 row-span-2 bg-[var(--primary-blue-100)] ${landingPageCardsCommonStyles}`}
        >
          {/* Text Box */}
          <div className='flex flex-col justify-center mt-[45px] ml-[42px]'>
            <h2 className='font-semibold text-[30px]'>소형이사</h2>
            <h3 className='text-[20px] text-[var(--grayscale-400)] mt-[9px]'>
              원룸, 투룸, 20평대 미만
            </h3>
          </div>
        </div>

        {/* 가로 박스1 */}
        <div
          className={`col-span-2 rounded-[32px]  bg-[var(--background)] ${landingPageCardsCommonStyles}`}
        >
          {/* Text Box */}
          <div className='flex flex-col justify-center mt-[45px] ml-[42px]'>
            <h2 className='font-semibold text-[30px]'>가정이사</h2>
            <h3 className='text-[20px] text-[var(--grayscale-400)] mt-[9px]'>
              쓰리룸, 20평대 미만
            </h3>
          </div>
        </div>

        {/* 가로 박스2 */}
        <div
          className={`col-span-2 rounded-[32px]  bg-[var(--background)] ${landingPageCardsCommonStyles}`}
        >
          {/* Text Box */}
          <div className='flex flex-col justify-center mt-[45px] ml-[42px]'>
            <h2 className='font-semibold text-[30px]'>기업, 사무실 이사</h2>
            <h3 className='text-[20px] text-[var(--grayscale-400)] mt-[9px]'>
              사무실, 상업공간
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

const landingPageCardsCommonStyles =
  'transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[4px_4px_8px_0px_rgba(0,0,0,0.2)] active:shadow-[inset_4px_4px_8px_0px_rgba(0,0,0,0.2)] active:scale-[1] rounded-[32px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.1)]';
