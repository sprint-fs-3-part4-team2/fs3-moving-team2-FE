import StarIcon from '../../atoms/starIcon';
import { RatingStarsProps } from './ratingStars.types';

export default function RatingStars({ rating, onClick }: RatingStarsProps) {
  const filledStarArray = Array.from(
    { length: Math.min(rating, 5) },
    (_, index) => index + 1,
  );
  const emptyStarArray = Array.from(
    { length: Math.max(5 - rating, 0) },
    (_, index) => filledStarArray.length + index + 1,
  );

  const handleClick = (value: number) => {
    if (onClick) onClick(value);
  };

  return (
    <div className='flex'>
      {filledStarArray.map((value) => (
        <StarIcon
          key={value}
          filled={true}
          onClick={() => handleClick(value)}
        />
      ))}
      {emptyStarArray.map((value) => (
        <StarIcon
          key={value}
          filled={false}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
}
