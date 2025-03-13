import cn from '@/utils/cn';
import StarIcon from '../../atoms/starIcon';
import { StarRatingProp } from './starRating.type';
import { STAR_RATING_STYLES } from './constants';

export default function StarRating({
  rating,
  className,
}: StarRatingProp): JSX.Element {
  const stars = Array.from({ length: rating }, (_, index) => (
    <StarIcon key={index} />
  ));

  return <div className={cn(STAR_RATING_STYLES, className)}>{stars}</div>;
}
