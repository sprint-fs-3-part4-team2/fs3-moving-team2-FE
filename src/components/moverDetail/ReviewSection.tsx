import { Review, ReviewResponse } from '@/services/types/mover';
import RatingStat from '@/components/common/ratingStat/templates/ratingStat';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import Pagination from '@/components/pagination/molecule/pagination';

interface ReviewSectionProps {
  reviewsData: ReviewResponse | undefined;
  isLoadingReviews: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ReviewSection({
  reviewsData,
  isLoadingReviews,
  currentPage,
  onPageChange,
}: ReviewSectionProps) {
  if (isLoadingReviews) {
    return <div>리뷰 로딩 중...</div>;
  }

  const totalPages = reviewsData?.totalPages ?? 1;
  const currentReviews = reviewsData?.reviews ?? [];

  return (
    <div className='px-6'>
      <RatingStat
        ratingCounts={
          reviewsData?.ratingCounts ?? {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          }
        }
        averageRating={reviewsData?.averageRating ?? 0}
        totalCount={reviewsData?.ratingCount ?? 0}
      />

      {/* 리뷰 리스트 */}
      {currentReviews.map((review: Review) => (
        <ReviewBlock
          key={review.id}
          name={review.name}
          writtenAt={review.writtenAt}
          rating={review.rating}
          content={review.content}
        />
      ))}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className='flex justify-center mt-[40px] mb-[59px]'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
