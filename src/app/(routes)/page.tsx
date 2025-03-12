import Image from 'next/image';
import React from 'react';

export default function Home(): JSX.Element {
  return (
    <div className='animate-fadeIn w-[439px] w-full min-h-screen bg-[var(--background-400)] flex flex-col items-center'>
      <h1 className='text-[27px] xl:text-[36px] w-[325px] xl:w-[440px] font-semibold leading-[50px] mt-20 text-[var(--black-500)] text-center animate-fadeIn'>
        원하는 이사 서비스를 요청하고 견적을 받아보세요
      </h1>

      {/* Main Grid */}
      <div className='mt-[40px] mb-[100px] grid grid-cols-1 gap-[36px] auto-rows-fr xxl:grid-cols-3 gap-[24px] cursor-pointer'>
        {/* 세로 박스 */}
        <div
          className={`w-[327px] h-[240px] xxl:w-[432px] xxl:h-[589px] xxl:col-span-1 xxl:row-span-2 bg-[var(--primary-blue-100)] ${landingPageCardsCommonStyles}`}
        >
          {/* Text Box */}
          <div className={textBoxStyles}>
            <h2 className={textBoxHeadTitleStyles}>소형이사</h2>
            <h3 className={textBoxHeadSubTitleStyles}>
              원룸, 투룸, 20평대 미만
            </h3>
          </div>

          <div className={firstCardImageStyles}>
            <Image
              fill
              src='/img/landing/lundury-img.svg'
              alt='소형이사 이미지'
              className='object-cover'
            />
          </div>
        </div>

        {/* 가로 박스1 */}
        <div
          className={`xxl:col-span-2 rounded-[32px]  bg-[var(--background)] ${landingPageCardsCommonStyles}`}
        >
          {/* Text Box */}
          <div className={textBoxStyles}>
            <h2 className={textBoxHeadTitleStyles}>가정이사</h2>
            <h3 className={textBoxHeadSubTitleStyles}>쓰리룸, 20평대 미만</h3>
          </div>

          <div className='absolute w-[250px] h-[140px] left-[98px] bottom-[-5px] xxl:w-[460px] xxl:h-[260px] xxl:left-[465px] xxl:bottom-[-8px] animate-moveForward'>
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
          className={`xxl:col-span-2 rounded-[32px]  bg-[var(--background)] ${landingPageCardsCommonStyles}`}
        >
          {/* Text Box */}
          <div className={textBoxStyles}>
            <h2 className={textBoxHeadTitleStyles}>기업, 사무실 이사</h2>
            <h3 className={textBoxHeadSubTitleStyles}>사무실, 상업공간</h3>
          </div>

          <div className='absolute w-[280px] h-[130px] left-[50px] bottom-[0px] xxl:w-[570px] xxl:h-[240px] xxl:left-[320px] xxl:bottom-[0px] animate-enlargeAndShake'>
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
  'transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[4px_4px_8px_-1px_rgba(0,0,0,0.2)] rounded-[32px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.1)] overflow-hidden group';

const firstCardImageStyles =
  'w-[196px] h-[164px] bottom-[6px] right-[0px] xxl:w-[380px] xxl:h-[320px] xxl:bottom-[50px] xxl:left-[83px] animate-shakeVerticalWithAngle transition-transform duration-500 group-hover:-translate-y-2 transform transition-all duration-500 group-hover:-translate-y-5 animate-moveDown absolute';

const textBoxStyles =
  'flex flex-col justify-center mt-[20px] ml-[30px] xxl:mt-[45px] xxl:ml-[42px]';

const textBoxHeadTitleStyles = 'font-semibold text-[25px] xxl:text-[30px]';

const textBoxHeadSubTitleStyles =
  'text-[16px] xxl:text-[20px] text-[var(--grayscale-400)] mt-[5px] xxl:mt-[9px]';
