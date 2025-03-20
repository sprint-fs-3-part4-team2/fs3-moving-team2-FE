'use client';
import { useState } from 'react';
import ReviewStar from './reviewRating';
import { MockData } from '@/components/moverMypage/reviewMockdata';
import MoverStatInfo from '@/components/moverMypage/component';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import Pagination from '@/components/pagination/molecule/pagination';

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(MockData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = MockData.slice(startIndex, endIndex);
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
          {currentData.map((review) => (
            <ReviewBlock
              key={review.id}
              name={review.name}
              writtenAt={review.writtenAt}
              rating={review.rating}
              content={review.content}
            />
          ))}
        </div>
        <div className='flex justify-center mt-[40px] mb-[59px]'>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className='mx-auto'
            />
          )}
        </div>
      </div>
    </div>
  );
}
