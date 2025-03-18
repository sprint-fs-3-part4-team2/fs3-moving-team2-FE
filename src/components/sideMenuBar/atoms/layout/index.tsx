export default function SideMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-[220px] h-screen bg-background slideDown xl:hidden'>{children}</div>
  );
}
