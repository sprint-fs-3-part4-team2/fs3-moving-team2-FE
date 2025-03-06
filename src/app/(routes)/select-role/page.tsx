'use client';
import React, { useState } from 'react';
import s from './styles/select-role.module.css';
import Link from 'next/link';
import Links from './components/links';
import RoleImg from './components/roleimg';
import Image from 'next/image';
import Content from './components/content';
import MobileLink from './components/mobile-link';
import Tooltip from './components/tooltip';

const commonText = '일반유저 보러가기';
const partnerText = '파트너 보러가기';

export default function SliceBox() {
  const [location, setLocation] = useState<string>(s.right);

  function changeBg(e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) {
    e.preventDefault();
    e.stopPropagation();
    setLocation((prev) => (prev === s.left ? s.right : s.left));
  }

  return (
    <div className={`${s.page}`}>
      <div
        className={`${s.container} 
   `}
      >
        <Content
          className={`${s.content} ${s.left} ${
            location !== s.left && s.active
          }`}
          title='COMMON'
          comment='편리한 이사, 합리적인 이사, 맞춤형 이사'
        >
          <Links href={{ signin: '#', signup: '#' }} />
          <RoleImg src={'/img/select-role/common.gif'} />
          <MobileLink onClick={changeBg}>{partnerText}</MobileLink>
        </Content>
        <Content
          className={`${s.content} ${s.right} ${
            location !== s.right && s.active
          }`}
          title='PARTNER'
          comment='고객들과 더 가깝고 편리하게'
        >
          <Links href={{ signin: '#', signup: '#' }} />
          <RoleImg src={'/img/select-role/mover.gif'} />
          <MobileLink onClick={changeBg}>{commonText}</MobileLink>
        </Content>

        <div
          className={`${s.background} ${location}`}
          // onClick={changeBg}
        >
          <Tooltip open={true}>여기를 클릭해주세요</Tooltip>

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
