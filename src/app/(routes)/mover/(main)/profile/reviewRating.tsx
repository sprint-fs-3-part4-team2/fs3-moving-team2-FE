'use client';
import RatingStat from '@/components/common/ratingStat/templates/ratingStat';

export default function ReviewStar() {
  const ratingData = {
    averageRating: 4.5, // ⭐ 평균 평점
    totalCount: 120, // 총 리뷰 개수
    ratingCounts: {
      5: 80, // ⭐⭐⭐⭐⭐ (5점) 리뷰 개수
      4: 25, // ⭐⭐⭐⭐ (4점) 리뷰 개수
      3: 10, // ⭐⭐⭐ (3점) 리뷰 개수
      2: 3, // ⭐⭐ (2점) 리뷰 개수
      1: 2, // ⭐ (1점) 리뷰 개수
    },
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'></h1>
      <RatingStat
        averageRating={ratingData.averageRating}
        totalCount={ratingData.totalCount}
        ratingCounts={ratingData.ratingCounts}
      />
    </div>
  );
}
