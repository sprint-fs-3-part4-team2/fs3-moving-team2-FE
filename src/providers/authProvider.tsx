'use client';

import { useUserStore } from '@/store/userStore';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (pathname !== '/select-role') {
      return;
    }
    if (user) {
      return;
    }
    router.push('/select-role');
  }, [pathname, user]);

  return children;
}
