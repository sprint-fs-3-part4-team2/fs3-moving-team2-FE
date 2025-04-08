import RatingStat from '@/components/common/ratingStat/templates/ratingStat';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import Pagination from '@/components/pagination/molecule/pagination';

interface Review {
  id: string;
  name: string;
  writtenAt: string;
  rating: number;
  ratingCount: number;
  content: string;
  introduction: string;
  regions: string[];
}

interface RatingCounts {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface ReviewResponse {
  reviews: Review[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  averageRating: number;
  ratingCount: number;
  ratingCounts: RatingCounts;
}

interface MoverDetailReviewsProps {
  reviewsData: ReviewResponse | undefined;
  isLoadingReviews: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function MoverDetailReviews({
  reviewsData,
  isLoadingReviews,
  currentPage,
  onPageChange,
}: MoverDetailReviewsProps) {
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

      {currentReviews.map((review: Review) => (
        <ReviewBlock
          key={review.id}
          name={review.name}
          writtenAt={review.writtenAt}
          rating={review.rating}
          content={review.content}
        />
      ))}

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
