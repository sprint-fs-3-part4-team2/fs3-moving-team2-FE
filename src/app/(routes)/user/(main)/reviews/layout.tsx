import TabNav from '@/components/common/tabNav/molecules/tabNav';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = {
    '/user/reviews/pending': '작성 가능한 리뷰',
    '/user/reviews/completed': '내가 작성한 리뷰',
  };

  return (
    <div>
      <TabNav tab={tabs} />
      {children}
    </div>
  );
}
