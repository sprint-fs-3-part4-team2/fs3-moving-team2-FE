import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Provider from '../providers/_provider';
import dynamic from 'next/dynamic';
import ChatRoomList from '@/components/chat/chat';
import GNB from '@/components/layout/gnb/template';
// import Analytics from '@/components/analytics/page';

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
    <html lang='Ko'>
      <body
        className={`${pretendard.variable} antialiased h-screen flex flex-col`}
      >
        {/* 개발이 끝나고 활성화 */}
        {/* <Analytics /> */}
        <Provider>
          <GNB />
          {children}
        </Provider>
      </body>
    </html>
  );
}
