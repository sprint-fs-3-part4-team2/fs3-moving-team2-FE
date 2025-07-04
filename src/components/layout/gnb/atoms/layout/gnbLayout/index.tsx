import cn from '@/utils/cn';
import { GNBLayoutProps } from './gnbLayout.type';
import { GNB_LAYOUT_STYLES } from '../../../styles/variables';

export default function GNBLayout({ children }: GNBLayoutProps) {
  return <nav className={cn(GNB_LAYOUT_STYLES)}>{children}</nav>;
}
