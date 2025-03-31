import { PropsWithChildren } from 'react';
import QueryProvider from '@/providers/queryProvider';
import ToasterProvider from '@/providers/toastProvider';
import AuthProvider from './authProvider';

// provider 관련 코드 합치기
export default function Provider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ToasterProvider>{children}</ToasterProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
