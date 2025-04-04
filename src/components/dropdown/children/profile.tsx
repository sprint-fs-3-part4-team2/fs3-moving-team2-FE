'use client';
import cn from '@/utils/cn';
import Dropdown, { DropdownProps } from '../dropdown';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import useLogout from '@/hooks/auth/useLogout';
import { useQueryClient } from '@tanstack/react-query';
import { MyProfile } from '@/services/auth/types';

function Profile({
  isOpen,
  children,
  className,
}: Omit<DropdownProps, 'dispatch'>) {
  const [open, setOpen] = useState(isOpen || false);
  const pathname = usePathname();
  const divRef = useRef<HTMLDivElement | null>(null);
  const logout = useLogout();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<MyProfile>(['userProfile']);

  let userType = '고객님';
  if (data?.userType === 'customer') userType = '고객님';
  else if (data?.userType === 'mover') userType = '기사님';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function openHandle(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setOpen((prev) => !prev);
  }

  return (
    <div
      className={cn('relative', className && className)}
      ref={divRef}
    >
      <div
        className='w-full h-full cursor-pointer'
        onClick={openHandle}
      >
        {children}
      </div>
      <Dropdown
        isOpen={open}
        className={cn(
          'absolute left-1/2 transform -translate-x-1/2',
          'block w-[152px] min-h-[224px] px-[6px] pt-[10px] pb-2 top-[140%] z-[100]',
          'xl:rightw-[248px] xl:pt-3 xl:pb-[6px] xl:px-1',
        )}
      >
        <h2
          className={cn(
            'text-black-400 py-[10px] pl-3 font-bold text-lg',
            'xl:py-[14px] xl:pl-6 xl:text-[18px]',
          )}
        >
          <span
            className='block w-full max-w-[100px] truncate overflow-hidden whitespace-nowrap'
            title={data?.name}
          >
            {data?.name}
          </span>{' '}
          {userType}
        </h2>
        <ul>
          <ProfileList href={'/user/profile/edit'}>프로필 수정</ProfileList>
          <ProfileList href={'/user/movers/favorite'}>찜한 기사님</ProfileList>
          <ProfileList href={'/user/reviews/completed'}>이사 리뷰</ProfileList>
          <li
            className={cn(
              'h-[38px] flex items-center justify-center border-t border-line-200 mt-2 cursor-pointer',
              'xl:h-[46px] xl:mt-3',
              'group hover:bg-grayscale-50',
            )}
          >
            <button
              className={cn(
                'text-grayscale-500 text-xs font-normal',
                'xl:text-lg xl:font-medium ',
                'group-hover:text-primary-blue-200 group-hover:font-bold',
              )}
              onClick={(e) => {
                e.preventDefault();
                logout.mutate();
              }}
            >
              로그아웃
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}

interface ProfileListProps extends PropsWithChildren {
  href: LinkProps['href'];
}

function ProfileList({ href, children }: ProfileListProps) {
  return (
    <li
      className={cn(
        'h-10 py-2 pl-3 cursor-pointer',
        'xl:h-[54px] xl:py-[14px] xl:pl-6',
        'hover:bg-grayscale-50 group',
      )}
    >
      <Link
        className={cn(
          'text-black-400 text-md font-medium w-full h-full block',
          'group-hover:text-primary-blue-300 group-hover:font-bold',
          'xl:text-lg',
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

export default Profile;
