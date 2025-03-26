import { PropsWithChildren } from 'react';
import QueryProvider from '@/providers/queryProvider';
import ToasterProvider from '@/providers/toastProvider';

// provider 관련 코드 합치기
export default function Provider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ToasterProvider>{children}</ToasterProvider>
    </QueryProvider>
  );
}
