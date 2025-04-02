import { PropsWithChildren } from 'react';
import QueryProvider from '@/providers/queryProvider';
import ToasterProvider from '@/providers/toastProvider';
import WarningProvider from './warningProvider';

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
