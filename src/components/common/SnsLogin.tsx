'use client';

import React from 'react';

const snsProviders = [
  {
    name: 'Google',
    bgColor: 'bg-[var(--line-100)]',
    imgSrc: '/icons/social/google.svg',
    alt: 'Google Login',
    width: 'w-[20px] md:w-[27px]',
    height: 'h-[20px] md:h-[27px]',
  },
  {
    name: 'Kakao',
    bgColor: 'bg-[#FAE300]',
    imgSrc: '/icons/social/kakao.svg',
    alt: 'Kakao Login',
    width: 'w-[22px] md:w-[30px]',
    height: 'h-[20px] md:h-[27px]',
  },
  {
    name: 'Naver',
    bgColor: 'bg-[#03C75A]',
    imgSrc: '/icons/social/naver.svg',
    alt: 'Naver Login',
    width: 'w-[22px] md:w-[24px]',
    height: 'h-[22px] md:h-[24px]',
  },
];

const SnsLogin = () => {
  const handleLogin = (provider: string) => {
    window.location.href = `/api/auth/${provider.toLowerCase()}`;
  };

  return (
    <div className='flex flex-col items-center space-y-6 md:space-y-8'>
      <p className='text-[var(--black-200)] font-regular text-xs md:text-xl'>
        SNS 계정으로 간편 가입하기
      </p>
      <div className='flex space-x-6 md:space-x-8'>
        {snsProviders.map(({ name, bgColor, imgSrc, alt, width, height }) => (
          <button
            key={name}
            onClick={() => handleLogin(name)}
            className={`w-[54px] h-[54px] md:w-[72px] md:h-[72px] rounded-full flex items-center justify-center ${bgColor}`}
          >
            <img
              src={imgSrc}
              alt={alt}
              className={`object-contain ${width} ${height}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SnsLogin;
