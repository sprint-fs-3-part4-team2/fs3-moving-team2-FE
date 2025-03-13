import ReviewStar from './reviewRating';
import ReviewItem from './reviewlist/review';
import { MockData } from './reviewlist/reviewMockdata';
import MoverStatInfo from './profile/component';

export default function myPage() {
  return (
    <div className='mx-200'>
      <MoverStatInfo
        imageUrl='/profile-placeholder.png' // 실제 프로필 이미지 경로
        rating={4.8} // 평점
        ratingCount={120} // 평점 개수
        experienceYears={10} // 경력 (년)
        isFavorite={true} // 즐겨찾기 여부
        favoriteCount={230} // 즐겨찾기 개수
        quoteCount={320} // 견적 요청 수
        isFavoriteMoverList={false} // 즐겨찾기 리스트 여부
      />
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
