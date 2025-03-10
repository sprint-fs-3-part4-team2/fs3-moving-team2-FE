import { INFO_STYLE } from '../constants';

export default function StringInfo({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={INFO_STYLE}>{children}</div>;
}
