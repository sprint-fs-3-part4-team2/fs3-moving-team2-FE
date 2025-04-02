'use client';
import { PropsWithChildren, useState, useEffect } from 'react';
import s from './styles/select-role.module.css';
import Link from 'next/link';
import Links from './components/links';
import Image from 'next/image';
import Content from './components/content';
import MobileLink from './components/mobile-link';
import Tooltip from './components/tooltip';
import { useToaster } from '@/hooks/useToaster';
import { useSearchParams, useParams } from 'next/navigation';
import { UserType } from '@/components/authPage/common.types';

const commonText = '일반유저';
const partnerText = '파트너';

export default function SliceBox() {
  const [location, setLocation] = useState<string>(s.right);
  const [tt, setTT] = useState(partnerText);
  const searchParams = useSearchParams();
  const params = useParams();
  const toaster = useToaster();
  useEffect(() => {
    const noAuth = searchParams.get('auth') === 'no';
    const userType = searchParams.get('type') as UserType | 'nouser';
    if (noAuth && userType === 'nouser')
      toaster('warn', '로그인이 필요합니다.');
  }, [params]);

  function changeBg(e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) {
    e.preventDefault();
    e.stopPropagation();
    setLocation((prev) => (prev === s.left ? s.right : s.left));
    setTT((prev) => (prev === partnerText ? commonText : partnerText));
  }

  return (
    <div className={`${s.page} bg-backgroundVariants-50`}>
      <div
        className={`${s.container} 
   `}
      >
        <Content
          className={`${s.content} ${s.left} ${
            location !== s.left && s.active
          }`}
          title='Customer'
          comment='편리한 이사, 합리적인 이사, 맞춤형 이사'
        >
          <Links href={{ signin: '/user/sign-in', signup: '/user/sign-up' }} />
          <MobileLink onClick={changeBg}>{partnerText}</MobileLink>
        </Content>
        <Content
          className={`${s.content} ${s.right} ${
            location !== s.right && s.active
          }`}
          title='Mover'
          comment='고객들과 더 가깝고 편리하게'
        >
          <Links
            href={{ signin: '/mover/sign-in', signup: '/mover/sign-up' }}
          />
          <MobileLink onClick={changeBg}>{commonText}</MobileLink>
        </Content>

        <Background
          location={location}
          onClick={changeBg}
        >
          <Tooltip
            open={true}
            bottom={50}
          >
            {tt}는 여기
          </Tooltip>
        </Background>
      </div>
    </div>
  );
}

function Background({
  onClick,
  children,
  location,
}: {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  location: string;
} & PropsWithChildren) {
  return (
    <div
      className={`${s.background} ${location}`}
      // onClick={changeBg}
    >
      <Link
        href={'/'}
        className={s.bgLogo}
      >
        <Image
          src='/img/logo/logo-with-icon.svg'
          alt='로고'
          width={150}
          height={50}
        />
      </Link>
      <Link
        href='#'
        onClick={onClick}
        className={s.moveLink}
      >
        {children}
        <p className={s.moveLink}>
          {location === s.left ? commonText : partnerText}
        </p>
      </Link>
    </div>
  );
}
