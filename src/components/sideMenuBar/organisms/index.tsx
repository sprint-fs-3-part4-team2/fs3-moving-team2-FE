'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Backdrop from '../atoms/backdrop';
import SideMenuLayout from '../atoms/layout';
import CloseIcon from '../atoms/closeIcon';
import SideBarMenu from '../molecule/sideBarMenu';
import { SideNavigationBarProps } from './sideNavigationBar.type';
import useEscapeKey from '@/hooks/useEscapeKey';

export default function SideNavigationBar({
  userType,
  setIsOpen,
  isOpen,
}: SideNavigationBarProps) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  // esc로 컴포넌트 닫기
  useEscapeKey(() => {
    setIsOpen(false);
  });

  // 다른 페이지 이동 시 닫기
  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      setIsOpen(false);
      prevPathRef.current = pathname;
    }
  }, [pathname, setIsOpen]);

  return (
    <div>
      {isOpen && (
        <Backdrop>
          <SideMenuLayout>
            <CloseIcon closeOnClick={() => setIsOpen(false)} />
            <SideBarMenu userType={userType} />
          </SideMenuLayout>
        </Backdrop>
      )}
    </div>
  );
}
