interface Props {
  quotePrice: number;
  className?: string;
}

export default function QuotePrice({ quotePrice, className = '' }: Props) {
  const classNames = `text-xl font-bold ${className} md:text-xl xl:text-3xl`;
  return <p className={classNames}>{quotePrice.toLocaleString()}원</p>;
}
