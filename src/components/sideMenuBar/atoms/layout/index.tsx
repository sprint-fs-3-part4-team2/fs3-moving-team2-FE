import { SIDE_MENU_STYLE } from './constant';

export default function SideMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={SIDE_MENU_STYLE}>{children}</div>;
}
