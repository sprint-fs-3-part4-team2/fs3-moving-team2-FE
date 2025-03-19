import { PagePath } from '../../common.types';

type PageType = 'signIn' | 'signUp';

export interface ActionButtonSectionProps {
  pageType: PageType;
  moveToPage: PagePath;
}
