'use client';

import { usePathname } from 'next/navigation';
import GNBLayout from '../atoms/layout/gnbLayout';
import GNBLogo from '../molecules/gnbLogo';
import { GNB_LOGO_MENU_STYLES, GNB_STYLES } from './constant';
import dynamic from 'next/dynamic';
const GNBRightSection = dynamic(() => import('../organisms/gnbRightSection'), {
  ssr: false,
});
const GNBMenu = dynamic(() => import('../molecules/gnbMenu'));

export default function GNB() {
  const pathname = usePathname();

  const hidePathnames = [
    '/select-role',
    '/mover/sign-in',
    '/mover/sign-up',
    '/user/sign-in',
    '/user/sign-up',
  ];
  if (hidePathnames.includes(pathname)) {
    return null;
  }

  return (
    <div className={GNB_STYLES}>
      <GNBLayout>
        <div className={GNB_LOGO_MENU_STYLES}>
          <GNBLogo isAuthorized={true} />
          <GNBMenu />
        </div>
        <GNBRightSection />
      </GNBLayout>
    </div>
  );
}
