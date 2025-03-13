import { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

export default function QuoteTitle({ className = '', children }: Props) {
  const classNames = `text-lg font-semibold ${className} md:text-lg xl:text-2xl`;
  return <p className={classNames}>{children}</p>;
}
