'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import Link from 'next/link';
import Links from './components/links';
import Image from 'next/image';
import Content from './components/content';
import MobileLink from './components/mobile-link';
import Tooltip from './components/tooltip';
import cn from '@/utils/cn';
import { useRouter, useSearchParams } from 'next/navigation';

const commonText = '일반유저';
const partnerText = '파트너';

export default function SliceBox() {
  const [tt, setTT] = useState('');
  const router = useRouter();
  const query = useSearchParams();
  const userType = query.get('userType');
  useEffect(() => {
    setTT(() => (userType === 'mover' ? commonText : partnerText));
  }, [userType]);

  function changeBg(e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) {
    e.preventDefault();
    e.stopPropagation();
    setTT((prev) => (prev === partnerText ? commonText : partnerText));
    router.push(
      userType === 'mover' ? '?userType=customer' : '?userType=mover',
    );
  }

  return (
    <div
      className={cn(
        'relative w-full h-screen text-white bg-backgroundVariants-50',
      )}
    >
      <div
        className={cn(
          'absolute w-full h-full max-h-none flex left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-blue-200 transition-all',
        )}
      >
        <Content
          className={cn(userType !== 'mover' && 'w-full md:w-1/2 opacity-100 ')}
          location={cn('-right-full', userType !== 'mover' && 'right-0')}
          title='Customer'
          comment='편리한 이사, 합리적인 이사, 맞춤형 이사'
        >
          <Links href={{ signin: '/user/sign-in', signup: '/user/sign-up' }} />
          <MobileLink onClick={changeBg}>{partnerText}</MobileLink>
        </Content>
        <Content
          className={cn(userType === 'mover' && 'w-full md:w-1/2 opacity-100')}
          location={cn('-left-full', userType === 'mover' && 'left-0')}
          title='Mover'
          comment='고객들과 더 가깝고 편리하게'
        >
          <Links
            href={{ signin: '/mover/sign-in', signup: '/mover/sign-up' }}
          />
          <MobileLink onClick={changeBg}>{commonText}</MobileLink>
        </Content>

        <Background onClick={changeBg}>
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
}: {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
} & PropsWithChildren) {
  const query = useSearchParams();
  const userType = query.get('userType');

  return (
    <div
      className={cn(
        'hidden w-1/2 h-full bg-white absolute top-0 transition-all duration-700 md:flex items-center justify-center text-[46px] text-black-500',
        userType === 'mover' ? 'left-0' : 'left-1/2',
      )}
    >
      <Link
        href={'/'}
        // className={s.bgLogo}
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
        className={cn(
          'group absolute text-[18px] font-semibold w-[inherit] h-[30px] bottom-[10%] flex items-center justify-center text-center text-grayscale-400 transition-all duration-700',
        )}
      >
        {children}
        <p
          className={cn(
            'absolute text-[18px] font-semibold  h-[30px] bottom-[10%] flex items-center justify-center text-center text-grayscale-400 transition-all duration-700',
            'text-[18px] font-semibold text-center',
            'group-hover: text-[19px] group-hover:text-black-500 group-hover:font-bold',
          )}
        >
          {userType === 'mover' ? commonText : partnerText}
        </p>
      </Link>
    </div>
  );
}
