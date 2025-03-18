import TabNav from '@/components/common/tabNav/molecules/tabNav';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = {
    '/mover/quotes/submitted': '보낸 견적 조회',
    '/mover/quotes/declined': '반려 요청',
  };

  return (
    <>
      <TabNav tab={tabs} />
      {children}
    </>
  );
}
