import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import QueryProvider from './queryProvider';
import GNB from '@/components/layout/gnb/template';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard-variable',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '무빙',
  description: '이사 전문 플랫폼 무빙에 오신 것을 환영합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang='Ko'>
        <body className={`${pretendard.variable} antialiased`}>{children}</body>
      </html>
    </QueryProvider>
    <html lang='Ko'>
      <body className={`${pretendard.variable} antialiased`}>
        <GNB
          isUserAuthorized={true}
          userType='user'
          userName={'안성재'}
          imageUrl={'/img/sample-profile/sample-2.svg'}
          hasNotification={true}
        />
        {children}
      </body>
    </html>
  );
}
