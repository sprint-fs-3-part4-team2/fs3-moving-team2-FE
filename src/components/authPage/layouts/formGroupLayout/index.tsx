import { FORM_GROUP_LAYOUT_STYLES } from './constant';
import { FormGroupLayoutProps } from './formGroupLayout.type';

export default function FormGroupLayout({ children }: FormGroupLayoutProps) {
  return <div className={FORM_GROUP_LAYOUT_STYLES}>{children}</div>;
}
