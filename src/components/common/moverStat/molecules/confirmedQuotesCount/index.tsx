import StatContainer from '../../atoms/statContainer';
import StatText from '../../atoms/statText';
import { confirmedQuotesCountProps } from './confirmedQuotesCount.types';

export default function ConfirmedQuotesCount({
  quoteCount: count,
}: confirmedQuotesCountProps) {
  return (
    <StatContainer>
      <StatText variant='primary'>{count.toLocaleString()}건</StatText>
      <StatText variant='secondary'>확정</StatText>
    </StatContainer>
  );
}
