import { AuthPageLayoutProps } from './authPageLayout.type';
import { AUTH_PAGE_CONTENT_STYLES, AUTH_PAGE_LAYOUT_STYLES } from './constants';

export default function AuthPageLayout({ children }: AuthPageLayoutProps): JSX.Element {
  return (
    <div className={AUTH_PAGE_LAYOUT_STYLES}>
      <div className={AUTH_PAGE_CONTENT_STYLES}>{children}</div>
    </div>
  );
}
