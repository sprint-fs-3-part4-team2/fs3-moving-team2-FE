import ReviewStar from './reviewRating';
import { MockData } from '@/components/moverMypage/reviewMockdata';
import MoverStatInfo from '@/components/moverMypage/component';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import PageHeader from '@/components/common/shared/atoms/pageHeader';

export default function myPage() {
  return (
    <div>
      <div className='max-w-[1920px]'></div>
      <div className='max-w-[1400px] mx-auto w-full'>
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

        <div className='border-t border-gray-300 my-10 '></div>
        <ReviewStar />

        <div className='max-w-[955px]'>
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
    </div>
  );
}
