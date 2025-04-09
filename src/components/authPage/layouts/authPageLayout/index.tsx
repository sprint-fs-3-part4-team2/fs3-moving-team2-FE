import cn from '@/utils/cn';
import { ChildrenProp } from '../../common.types';
import { AUTH_PAGE_CONTENT_STYLES, AUTH_PAGE_LAYOUT_STYLES } from '../../styles/variables';

export default function AuthPageLayout({
  children,
}: ChildrenProp): JSX.Element {
  return (
    <div className={AUTH_PAGE_LAYOUT_STYLES}>
      <div
        className={cn(
          AUTH_PAGE_CONTENT_STYLES,
          'xl:max-w-[640px]',
          'sm:max-w-[327px]',
        )}
      >
        {children}
      </div>
    </div>
  );
}
