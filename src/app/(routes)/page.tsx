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

          <div
            style={{
              position: 'relative',
              width: '380px',
              height: '320px',
            }}
            className='animate-shakeVerticalWithAngle transition-transform duration-500 group-hover:-translate-y-2 group-active:translate-y-2" top-[110px] left-[83px] transform transition-all duration-500 group-hover:-translate-y-5 group-active:translate-y-2 animate-moveDown group-active:width-[300px] group-active:height-[290px]'
          >
            <Image
              fill
              src='/img/landing/lundury-img.svg'
              alt='소형이사 이미지'
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        {/* 가로 박스1 */}
        <div
          className={`col-span-2 rounded-[32px]  bg-[var(--background)] ${landingPageCardsCommonStyles}`}
        >
          {/* Text Box */}
          <div className='relative flex flex-col justify-center mt-[45px] ml-[42px]'>
            <h2 className='font-semibold text-[30px]'>가정이사</h2>
            <h3 className='text-[20px] text-[var(--grayscale-400)] mt-[9px]'>
              쓰리룸, 20평대 미만
            </h3>
          </div>

          <div className='absolute w-[460px] h-[260px] left-[450px] bottom-[-8px] animate-moveForward'>
            <Image
              fill
              src='/img/landing/car-img.svg'
              alt='가정이사 이미지'
              className='object-cover animate-float animate-hoverForward'
            />
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

          <div className='absolute w-[570px] h-[240px] left-[320px] bottom-[0px] animate-enlargeAndShake'>
            <Image
              fill
              src='/img/landing/building-img.svg'
              alt='기업, 사무실 이사 이미지'
              className='object-cover animate-hoverScale transition-transform'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const landingPageCardsCommonStyles =
  'transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[4px_4px_8px_-1px_rgba(0,0,0,0.2)] active:shadow-[inset_2px_2px_5px_2px_rgba(0,0,0,0.2)] active:scale-[1] rounded-[32px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.1)] overflow-hidden group';
