'use client';
import React, { PropsWithChildren, useState } from 'react';
import s from './styles/slicebox.module.css';
import Link from 'next/link';
import Links from './components/links';
import Right from './components/right';
import Left from './components/left';
import UserTypeSelect from './components/userTypeSelect';
import Image from 'next/image';

export default function SliceBox() {
  const [location, setLocation] = useState<string>(s.right);
  const [bgContent, setBgContent] = useState<React.ReactNode>(<Right />);

  function left(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setLocation(s.left);
    setBgContent(<Left />);
  }
  function right(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setLocation(s.right);
    setBgContent(<Right />);
  }

  function bgClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setLocation((prev) => (prev === s.left ? s.right : s.left));
    setBgContent(() => (location === s.left ? <Right /> : <Left />));
  }

  return (
    <div className={`${s.page}`}>
      <div className={s.container}>
        <SliceContent
          className={`${s.content} ${s.left} ${
            location !== s.left && s.active
          }`}
          title='COMMON'
          linkText='파트너'
          linkFnc={left}
          comment='편리한 이사, 합리적인 이사, 맞춤형 이사'
        >
          <Links href={{ signin: '#', signup: '#' }} />
          <UserTypeSelect src={'/video/common.mp4'} />
        </SliceContent>
        <SliceContent
          className={`${s.content} ${s.right} ${
            location !== s.right && s.active
          }`}
          title='PARTNER'
          linkText='일반유저'
          linkFnc={right}
          comment='고객들과 더 가깝고 편리하게'
        >
          <Links href={{ signin: '#', signup: '#' }} />
          {/* <UserTypeSelect src={'/video/mover.mp4'} /> */}
        </SliceContent>

        <div
          className={`${s.background} ${location}`}
          onClick={bgClick}
        >
          <Image
            src='/img/logo/logo-with-icon.svg'
            alt='로고'
            width={150}
            height={50}
          />
          {/* <UserTypeSelect src={'/video/mover.mp4'} /> */}

          {bgContent}
        </div>
      </div>
    </div>
  );
}

interface SliceContentProps extends PropsWithChildren {
  className?: string;
  title: string;
  comment: string;
  linkText: React.ReactNode;
  linkFnc: React.MouseEventHandler<HTMLAnchorElement>;
}
export function SliceContent({
  className,
  children,
  title,
  comment,
  linkText = '버튼',
  linkFnc,
}: SliceContentProps) {
  return (
    <div className={`${s.content} ${className}`.trim()}>
      <div className={s.move}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.comment}>{comment}</p>
        {children}
        {/* <Link
          className={s.moveLink}
          href={'#'}
          onClick={linkFnc}
        >
          {linkText}
        </Link> */}
      </div>
    </div>
  );
}
