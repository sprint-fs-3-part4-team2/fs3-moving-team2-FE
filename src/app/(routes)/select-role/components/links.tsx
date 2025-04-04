import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import s from './style/links.module.css';
import Animate from './animate';

interface LinksProps {
  href: {
    signin: string;
    signup: string;
  };
}
export default function Links({ href }: LinksProps) {
  return (
    <div className={s.links}>
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
      className={s.linkBox}
      color='#4da9ff'
    >
      <Link
        className='w-full h-full flex flex-col justify-center items-center'
        href={href}
      >
        {children}
      </Link>
    </Animate>
  );
}
