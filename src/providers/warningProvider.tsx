'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useToaster } from '@/hooks/useToaster';
import { useEffect } from 'react';
import { WARNING_MESSAGES } from '@/constants/warningMessages';

export default function WarningProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const warn = searchParams.get('warn') as keyof typeof WARNING_MESSAGES;
  const toast = useToaster();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (warn && warn.length && warn in WARNING_MESSAGES) {
      toast('warn', WARNING_MESSAGES[warn]);
    }

    if (warn) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('warn');

      const queryString = newParams.toString();
      const newPathname = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newPathname);
    }
  }, [searchParams, warn]);

  return <>{children}</>;
}
