'use client';

import cn from '@/utils/cn';
import Dropdown, { DropdownProps } from './dropdown';
import { PropsWithChildren, useEffect, useState } from 'react';
import Link, { LinkProps } from 'next/link';

function Profile({ isOpen }: Omit<DropdownProps, 'children'>) {
  const [name, setName] = useState('테스트');
  useEffect(() => {
    setName('테스트');
  }, []);
  return (
    <Dropdown
      isOpen={isOpen}
      className={cn(
        'block max-w-[152px]  min-h-[224px] px-[6px] pt-[10px] pb-2 ',
        'lg:max-w-[248px] lg:py-4 lg:px-1',
      )}
    >
      <h2 className='text-black-400 py-[10px] pl-3 lg:py-[14px] lg:pl-6 font-bold text-lg lg:text-[18px]'>
        {name} 고객님
      </h2>
      <ul>
        <ProfileList href={'#'}>프로필 수정</ProfileList>
        <ProfileList href={'#'}>찜한 기사님</ProfileList>
        <ProfileList href={'#'}>이사 리뷰</ProfileList>
        <li
          className={cn(
            'h-[38px] flex items-center justify-center border-t border-grayscale-50 mt-2',
            'lg:h-[40px] lg:mt-3',
          )}
        >
          <Link
            className={cn(
              'text-grayscale-500 text-xs font-normal',
              'lg:text-md font-medium',
            )}
            href='#'
            onClick={() => {
              //로그아웃 함수
            }}
          >
            로그아웃
          </Link>
        </li>
      </ul>
    </Dropdown>
  );
}

interface ProfileListProps extends PropsWithChildren {
  href: LinkProps['href'];
}
function ProfileList({ href, children }: ProfileListProps) {
  return (
    <li className={cn('h-10 py-2 pl-3', 'lg:h-[54px] lg:py-[14px] lg:pl-6')}>
      <Link
        className={cn('text-black-400 text-md font-medium', 'lg:text-lg')}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

export default Profile;
