import cn from '@/utils/cn';
import { COMMON_TEXT_STYLES } from './constant';
import { SideBarTextProps } from './sideBarText.type';

export default function SideBarText({ children }: SideBarTextProps) {
  return <span className={cn(COMMON_TEXT_STYLES)}>{children}</span>;
}
