'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const snsProviders = [
  {
    name: 'google',
    bgColor: 'bg-[var(--line-100)]',
    imgSrc: '/icons/social/google.svg',
    alt: 'Google Login',
    width: 'w-[20px] xl:w-[27px]',
    height: 'h-[20px] xl:h-[27px]',
  },
  {
    name: 'kakao',
    bgColor: 'bg-[#FAE300]',
    imgSrc: '/icons/social/kakao.svg',
    alt: 'Kakao Login',
    width: 'w-[22px] xl:w-[30px]',
    height: 'h-[20px] xl:h-[27px]',
  },
  {
    name: 'naver',
    bgColor: 'bg-[#03C75A]',
    imgSrc: '/icons/social/naver.svg',
    alt: 'Naver Login',
    width: 'w-[22px] xl:w-[24px]',
    height: 'h-[22px] xl:h-[24px]',
  },
];

const SnsLogin = ({ type }: { type: 'customer' | 'mover' }) => {
  const router = useRouter();
  const getOauthUrl = async (provider: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}?userType=${type}`,
    );
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
            onClick={() => getOauthUrl(name)}
            className={`w-[54px] h-[54px] xl:w-[72px] xl:h-[72px] rounded-full flex items-center justify-center ${bgColor}`}
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
