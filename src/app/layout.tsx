import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ToasterProvider from '@/hooks/useToaster/useToster';

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
      <body className={`${pretendard.variable} antialiased`}>
        <ToasterProvider>{children}</ToasterProvider>
      </body>
    </html>
  );
}
