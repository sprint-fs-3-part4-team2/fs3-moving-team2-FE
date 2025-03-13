import StarIcon from '@/components/common/shared/atoms/starIcon';
import StatText from '../../atoms/statText';
import { RatingProps } from './rating.types';
import StatContainer from '../../atoms/statContainer';

export default function RatingStat({ rating, ratingCount }: RatingProps) {
  const formattedRating = rating.toFixed(1);
  const formattedRatingCount = ratingCount >= 1000 ? '+999' : ratingCount;

  return (
    <StatContainer>
      <StarIcon
        filled={true}
        className='w-[14px] md:w-[14px] xl:w-[20px]'
      />
      <StatText variant='primary'>{formattedRating}</StatText>
      <StatText variant='secondary'>({formattedRatingCount})</StatText>
    </StatContainer>
  );
}
