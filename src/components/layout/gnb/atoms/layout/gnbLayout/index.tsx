import cn from '@/utils/cn';
import { GNB_LAYOUT_STYLES } from './constant';
import { GNBLayoutProps } from './gnbLayout.type';

export default function GNBLayout({ children }: GNBLayoutProps) {
  return <div className={cn(GNB_LAYOUT_STYLES)}>{children}</div>;
}
