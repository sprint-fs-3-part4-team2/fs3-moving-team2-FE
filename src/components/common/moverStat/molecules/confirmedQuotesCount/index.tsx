import StatContainer from '../../atoms/statContainer';
import StatText from '../../atoms/statText';
import { confirmedQuotesCountProps } from './confirmedQuotesCount.types';

export default function ConfirmedQuotesCount({
  quoteCount,
}: confirmedQuotesCountProps) {
  const formattedQuoteCount = quoteCount >= 1000 ? '+999' : quoteCount;
  return (
    <StatContainer>
      <StatText variant='primary'>{formattedQuoteCount}건</StatText>
      <StatText variant='secondary'>확정</StatText>
    </StatContainer>
  );
}
