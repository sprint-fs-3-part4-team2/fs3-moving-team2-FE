import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import QueryProvider from './queryProvider';
import dynamic from 'next/dynamic';

const GNB = dynamic(() => import('@/components/layout/gnb/template'), {
  ssr: false,
});

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
        <body
          className={`${pretendard.variable} antialiased h-screen flex flex-col`}
        >
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
    </QueryProvider>
  );
}
