import { ReactNode } from 'react';
import QuotePrice from '../atoms/price';
import QuoteTitle from '../atoms/title';

interface Props {
  quotePrice: number;
  className?: string;
  children?: ReactNode;
}

export default function QuoteCard({ children, quotePrice, className }: Props) {
  const classNames = `space-y-4 ${className} md:space-y-4 xl:space-y-8 `;
  return (
    <div className={classNames}>
      <QuoteTitle>{children}</QuoteTitle>
      <QuotePrice quotePrice={quotePrice} />
    </div>
  );
}
