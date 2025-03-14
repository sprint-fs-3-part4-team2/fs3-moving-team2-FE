import ReviewStar from './reviewRating';
import ReviewItem from './reviewlist/review';
import { MockData } from './reviewlist/reviewMockdata';
import MoverStatInfo from './profile/component';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import ReviewPage from './reviewlist/review';

export default function myPage() {
  return (
    <div className='mx-260'>
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
      <div className='border-t border-gray-300 mt-10'></div>
      <ReviewStar />

      <div className='p-6 space-y-4'>
        {MockData.map((review) => (
          <ReviewBlock
            key={review.id}
            name={review.name}
            writtenAt={review.writtenAt}
            rating={review.rating}
            content={review.content}
          />
        ))}
      </div>
    </div>
  );
}
