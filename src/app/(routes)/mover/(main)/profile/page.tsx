'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReviewStar from './reviewRating';
import MoverStatInfo from '@/components/moverMypage/component';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import Pagination from '@/components/pagination/molecule/pagination';
import { getMoverReviews } from '@/services/reviewsService';
import { getMoverProfile } from '@/services/profileService';
import { useParams } from 'next/navigation';

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // const { id } = useParams() as { id: string };
  const id = 'cm8pgoxk80008a7dhu6kf25ft';

  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useQuery({
    queryKey: ['moverReviews', id],
    queryFn: async () => await getMoverReviews(id),
  });

  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ['moverProfile', id],
    queryFn: async () => await getMoverProfile(id),
  });

  if (isLoadingReviews || isLoadingProfile)
    return <p className='text-center'>로딩 중...</p>;
  if (reviewsError || profileError || !reviewsData || !profileData)
    return (
      <p className='text-center'>데이터를 불러오는 중 오류가 발생했습니다.</p>
    );

  interface reviewsType {
    id: string;
    name: string;
    writtenAt: string;
    rating: number;
    content: string;
    introduction: string;
    regions: string;
  }
  const totalPages = Math.ceil(reviewsData.reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviewsData.reviews.slice(startIndex, endIndex);

  return (
    <div>
      <div className='max-w-[1920px]'></div>
      <div className='max-w-[1400px] mx-auto w-full'>
        <MoverStatInfo
          imageUrl={profileData.profileImage || '/profile-placeholder.png'}
          rating={reviewsData.averageRating}
          ratingCount={reviewsData.totalReviews}
          experienceYears={profileData.experienceYears}
          favoriteCount={profileData.favoriteCount ?? 0}
          quoteCount={profileData.totalConfirmedCount}
          isFavoriteMoverList={false}
          introduction={profileData.introduction}
          movingType={profileData.movingDate}
          regions={profileData.regions}
          moverName={profileData.moverName}
        />

        <div className='border-t border-gray-300 my-10 '></div>
        <ReviewStar />

        <div className='max-w-[955px]'>
          {currentReviews.map((data: reviewsType) => (
            <ReviewBlock
              key={data.id}
              name={data.name}
              writtenAt={data.writtenAt}
              rating={data.rating}
              content={data.content}
            />
          ))}
        </div>
        <div className='flex justify-center mt-[40px] mb-[59px]'>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className='mx-auto'
            />
          )}
        </div>
      </div>
    </div>
  );
}
