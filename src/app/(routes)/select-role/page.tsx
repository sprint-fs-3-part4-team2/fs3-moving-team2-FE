'use client';
import React, { PropsWithChildren, useState } from 'react';
import s from './styles/slicebox.module.css';
import Link from 'next/link';
import Links from './components/links';
import RoleImg from './components/roleimg';
import Image from 'next/image';

const commonText = '일반유저 보러가기';
const partnerText = '파트너 보러가기';

export default function SliceBox() {
  const [location, setLocation] = useState<string>(s.right);

  function changeBg(e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) {
    e.preventDefault();
    setLocation((prev) => (prev === s.left ? s.right : s.left));
  }

  return (
    <div className={`${s.page}`}>
      <div className={s.container}>
        <SliceContent
          className={`${s.content} ${s.left} ${
            location !== s.left && s.active
          }`}
          title='COMMON'
          comment='편리한 이사, 합리적인 이사, 맞춤형 이사'
        >
          <Links href={{ signin: '#', signup: '#' }} />
          <RoleImg src={'/video/common.mp4'} />
          <MobileLink onClick={changeBg}>{partnerText}</MobileLink>
        </SliceContent>
        <SliceContent
          className={`${s.content} ${s.right} ${
            location !== s.right && s.active
          }`}
          title='PARTNER'
          comment='고객들과 더 가깝고 편리하게'
        >
          <Links href={{ signin: '#', signup: '#' }} />
          <RoleImg src={'/video/mover.mp4'} />
          <MobileLink onClick={changeBg}>{commonText}</MobileLink>
        </SliceContent>

        <div
          className={`${s.background} ${location}`}
          onClick={changeBg}
        >
          <Image
            src='/img/logo/logo-with-icon.svg'
            alt='로고'
            width={150}
            height={50}
          />
          <Link
            className={s.moveLink}
            href={'#'}
          >
            {location === s.left ? commonText : partnerText}
          </Link>
        </div>
      </div>
    </div>
  );
}

interface SliceContentProps extends PropsWithChildren {
  className?: string;
  title: string;
  comment: string;
}
function SliceContent({
  className,
  children,
  title,
  comment,
}: SliceContentProps) {
  return (
    <div className={`${s.content} ${className}`.trim()}>
      <div className={s.move}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.comment}>{comment}</p>
        {children}
      </div>
    </div>
  );
}

interface MobileLinkProps extends PropsWithChildren {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}
function MobileLink({ children, onClick }: MobileLinkProps) {
  return (
    <Link
      className={s.mobileLink}
      href={'#'}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
