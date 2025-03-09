import StarIcon from '@/components/common/shared/atoms/starIcon';
import StatText from '../../atoms/statText';
import { RatingProps } from './rating.types';
import StatContainer from '../../atoms/statContainer';

export default function RatingStat({
  rating,
  ratingCount: count,
}: RatingProps) {
  return (
    <StatContainer>
      <StarIcon
        filled={true}
        className='w-[14px] md:w-[14px] xl:w-[20px]'
      />
      <StatText variant='primary'>{rating}</StatText>
      <StatText variant='secondary'>({count.toLocaleString()})</StatText>
    </StatContainer>
  );
}
