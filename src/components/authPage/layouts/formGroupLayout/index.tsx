import { FORM_GROUP_LAYOUT_STYLES } from './constant';
import { FormGroupLayoutProps } from './formGroupLayout.type';

export default function FormGroupLayout({
  children,
}: FormGroupLayoutProps): JSX.Element {
  return <div className={FORM_GROUP_LAYOUT_STYLES}>{children}</div>;
}
