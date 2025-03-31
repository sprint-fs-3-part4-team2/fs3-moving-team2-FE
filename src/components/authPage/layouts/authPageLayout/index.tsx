'use client';

import cn from '@/utils/cn';
import { ChildrenProp } from '../../common.types';
import { AUTH_PAGE_CONTENT_STYLES, AUTH_PAGE_LAYOUT_STYLES } from './constants';
import { useSearchParams } from 'next/navigation';
import { useToaster } from '@/hooks/useToaster';
import { useEffect } from 'react';

const warningMessage = {
  customerAccountExist: '알빈 유저 계정이 이미 존재합니다.',
  moverAccountExist: '기사님 계정이 이미 존재합니다.',
};

export default function AuthPageLayout({
  children,
}: ChildrenProp): JSX.Element {
  const searchParams = useSearchParams();
  const warn = searchParams.get('warn') as keyof typeof warningMessage;
  const toast = useToaster();

  useEffect(() => {
    if (warn && warn.length) toast('warn', warningMessage[warn]);
  }, [searchParams, warn]);

  return (
    <div className={AUTH_PAGE_LAYOUT_STYLES}>
      <div
        className={cn(
          AUTH_PAGE_CONTENT_STYLES,
          'xl:max-w-[640px]',
          'sm:max-w-[327px]',
        )}
      >
        {children}
      </div>
    </div>
  );
}
