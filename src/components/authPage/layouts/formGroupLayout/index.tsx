import { ChildrenProp } from '../../common.types';
import { FORM_GROUP_LAYOUT_STYLES } from './constant';

export default function FormGroupLayout({
  children,
}: ChildrenProp): JSX.Element {
  return <div className={FORM_GROUP_LAYOUT_STYLES}>{children}</div>;
}
