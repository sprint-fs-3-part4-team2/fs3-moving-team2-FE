import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import Animate from './animate';
import cn from '@/utils/cn';

interface LinksProps {
  href: {
    signin: string;
    signup: string;
  };
}
export default function Links({ href }: LinksProps) {
  return (
    <div className={cn('w-full mb-5')}>
      <LinkBox href={href.signin}>로그인</LinkBox>
      <LinkBox href={href.signup}>회원가입</LinkBox>
    </div>
  );
}

interface LinkBoxProps extends PropsWithChildren {
  href: string;
}
function LinkBox({ href, children }: LinkBoxProps) {
  return (
    <Animate
      className={cn(
        'w-[55%] max-w-[275px] h-[50px] ',
        'group md:w-4/5 max-w-[225px] h-[45px] border-2 border-white bg-white rounded-md my-5 mx-auto flex items-center justify-center cursor-pointer transition-all duration-500 shadow-lg',
      )}
      color='#4da9ff'
    >
      <Link
        className='group-hover:text-[20px] group-hover:font-bold group-hover:text-primary-blue-400 w-full h-full flex flex-col justify-center items-center text-[18px] font-semibold transition-all duration-300 text-grayscale-500'
        href={href}
      >
        {children}
      </Link>
    </Animate>
  );
}
