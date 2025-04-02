import { PropsWithChildren } from 'react';
import QueryProvider from '@/providers/queryProvider';
import ToasterProvider from '@/providers/toastProvider';
import dynamic from 'next/dynamic';
const WarningProvider = dynamic(() => import('./warningProvider'), {
  ssr: false,
});

// provider 관련 코드 합치기
export default function Provider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ToasterProvider>
        <WarningProvider>{children}</WarningProvider>
      </ToasterProvider>
    </QueryProvider>
  );
}
