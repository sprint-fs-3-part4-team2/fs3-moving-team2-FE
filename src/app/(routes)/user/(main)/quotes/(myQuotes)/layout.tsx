import TabNav from '@/components/common/tabNav/molecules/tabNav';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = {
    '/user/quotes/requested': '신청한 견적',
    '/user/quotes/pending': '대기 중인 견적',
    '/user/quotes/completed': '받았던 견적',
  };

  return (
    <div>
      <TabNav tab={tabs} />
      {children}
    </div>
  );
}
