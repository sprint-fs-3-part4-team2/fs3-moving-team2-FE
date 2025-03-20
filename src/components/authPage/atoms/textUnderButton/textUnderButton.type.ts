import { PagePath } from '../../common.types';

type PageType = 'signIn' | 'signUp';

export interface TextUnderButtonProps {
  pageType: PageType;
  moveToPage: PagePath;
}
