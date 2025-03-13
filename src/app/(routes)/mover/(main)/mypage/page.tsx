import ReviewStar from './reviewRating';
import ReviewItem from './reviewlist/review';
import { MockData } from './reviewlist/reviewMockdata';

export default function myPage() {
  return (
    <div className='mx-263 ...'>
      <ReviewStar />
      <div className='p-6 bg-white rounded-lg shadow-md'>
        {MockData.map((review) => (
          <ReviewItem
            key={review.id}
            nickname={review.nickname}
            data={review.date}
            rating={review.rating}
            content={review.content}
          />
        ))}
      </div>
    </div>
  );
}
