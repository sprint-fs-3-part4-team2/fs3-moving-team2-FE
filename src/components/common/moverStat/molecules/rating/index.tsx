import StarIcon from '@/components/common/shared/atoms/starIcon';
import StatText from '../../atoms/statText';
import { RatingProps } from './rating.types';
import StatContainer from '../../atoms/statContainer';

export default function Rating({ rating, ratingCount: count }: RatingProps) {
  return (
    <StatContainer>
      <StarIcon filled={true} />
      <StatText variant='primary'>{rating}</StatText>
      <StatText variant='secondary'>({count.toLocaleString()})</StatText>
    </StatContainer>
  );
}
