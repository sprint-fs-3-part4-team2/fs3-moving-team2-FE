'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MoverStatInfo from '@/components/moverMypage/component';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import Pagination from '@/components/pagination/molecule/pagination';
import { getMoverReviews } from '@/services/reviewsService';
import { getMoverProfile } from '@/services/profileService';
import { useRouter } from 'next/navigation';
import { MOVING_TYPES } from '@/constants/movingTypes';
import RatingStat from '@/components/common/ratingStat/templates/ratingStat';
import Loading from '@/app/loading';
import HiddenButton from '@/components/moverMypage/hiddenButton';
export type MovingTypeKey = keyof typeof MOVING_TYPES;
export type MovingTypeValue = (typeof MOVING_TYPES)[MovingTypeKey];

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useQuery({
    queryKey: ['moverReviews'],
    queryFn: async () => await getMoverReviews(),
    staleTime: 0,
  });

  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ['moverProfile'],
    queryFn: async () => await getMoverProfile(),
    staleTime: 0,
  });

  if (isLoadingReviews || isLoadingProfile)
    return (
      <p className='text-center'>
        <Loading />
      </p>
    );
  if (reviewsError || profileError || !reviewsData || !profileData)
    return (
      <p className='text-center'>데이터를 불러오는 중 오류가 발생했습니다.</p>
    );

  interface reviewsType {
    id: string;
    name: string;
    writtenAt: string;
    rating: number;
    ratingCount: number;
    content: string;
    introduction: string;
    regions: string[];
  }

  const totalPages = Math.ceil(reviewsData.reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviewsData.reviews.slice(startIndex, endIndex);
  const movingTypes: MovingTypeValue[] = profileData.movingType.map(
    (type: MovingTypeKey) => MOVING_TYPES[type],
  );

  return (
    <div>
      <div className='max-w-[1920px] '></div>
      <div className='max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-[72px]'>
        <MoverStatInfo
          imageUrl={profileData.imageUrl}
          rating={reviewsData.averageRating}
          ratingCount={reviewsData.ratingCount}
          experienceYears={profileData.experienceYears}
          favoriteCount={profileData.favoriteCount ?? 0}
          quoteCount={profileData.quoteCount}
          isFavoriteMoverList={false}
          introduction={profileData.introduction}
          movingType={movingTypes
            .map((type: MovingTypeValue) => type.value)
            .join(', ')}
          regions={profileData.regions.join(', ')}
          moverName={profileData.moverName}
          onEditClick={() => router.push('/mover/profile/edit')}
          onInfoEdit={() => router.push('/mover/info/edit')}
        />
        <div>
          <HiddenButton />
        </div>
        <div className='border-t border-gray-300 my-10 '></div>

        <RatingStat
          averageRating={reviewsData.averageRating}
          totalCount={reviewsData.ratingCount ?? 0}
          ratingCounts={reviewsData.ratingCounts ?? {}}
        />

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
