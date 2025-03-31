import { useSearchParams } from 'next/navigation';
import { useToaster } from '@/hooks/useToaster';
import { useEffect } from 'react';

const warningMessage = {
  customerAccountExist: '알빈 유저 계정이 이미 존재합니다.',
  moverAccountExist: '기사님 계정이 이미 존재합니다.',
};

export default function WarningToast({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const warn = searchParams.get('warn') as keyof typeof warningMessage;
  const toast = useToaster();

  useEffect(() => {
    if (warn && warn.length) toast('warn', warningMessage[warn]);
  }, [searchParams, warn]);

  return <>{children}</>;
}
