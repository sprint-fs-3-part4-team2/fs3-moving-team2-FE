import StarIcon from '../../atoms/starIcon';
import { RatingStarsProps } from './ratingStars.types';

export default function RatingStars({
  rating,
  onClick,
  iconClassName,
}: RatingStarsProps) {
  const filledStarArray = Array.from(
    { length: Math.min(rating, 5) },
    (_, index) => index + 1,
  );
  const emptyStarArray = Array.from(
    { length: Math.max(5 - rating, 0) },
    (_, index) => filledStarArray.length + index + 1,
  );

  return (
    <div className='flex'>
      {filledStarArray.map((value) => (
        <StarIcon
          key={value}
          filled={true}
          onClick={onClick ? () => onClick(value) : undefined}
          className={iconClassName}
        />
      ))}
      {emptyStarArray.map((value) => (
        <StarIcon
          key={value}
          filled={false}
          onClick={onClick ? () => onClick(value) : undefined}
          className={iconClassName}
        />
      ))}
    </div>
  );
}
