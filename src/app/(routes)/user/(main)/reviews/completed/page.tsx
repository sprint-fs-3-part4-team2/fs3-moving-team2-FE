'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import Pagination from '@/components/pagination/molecule/pagination';
import Image from 'next/image';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import { getCompletedReviews } from '@/services/reviewsService';
import { MOVING_TYPES } from '@/constants/movingTypes';

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [emptyData, setEmptyData] = useState(false);

  const {
    data: movers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['completedReviews'],
    queryFn: getCompletedReviews,
    staleTime: 0,
  });

  interface Mover {
    id: string;
    moverName: string;
    movingType: (keyof typeof MOVING_TYPES)[];
    isCustomQuote: boolean;
    movingDate: Date;
    price: number;
    reviewContent: string;
    rating: number;
    writtenAt: Date;
    imageUrl: string;
  }

  useEffect(() => {
    if (!isLoading && (!movers || movers.length === 0 || error)) {
      setEmptyData(true);
    }
  }, [isLoading, movers, error]);

  if (isLoading) return <p className='text-center'> 데이터 불러오는 중...</p>;

  if (emptyData)
    return (
      <div className='flex flex-col items-center justify-center w-full h-[656px]'>
        <div>
          <Image
            src='/img/no-review.svg'
            alt='리뷰없음 이미지'
            width={184}
            height={136}
          />
        </div>
        <div className='text-gray-400 my-[32px]'>
          여기 등록된 리뷰가 없어요!
        </div>
        <div>
          <CommonButton
            widthType='dynamic'
            heightType='primary'
            backgroundColorType='blue'
            borderColorsType='none'
            textColorType='white'
            className='w-[180px]'
            onClick={() => router.push('/user/reviews/pending')}
          >
            리뷰 작성하러 가기
          </CommonButton>
        </div>
      </div>
    );

  const totalPages = Math.ceil((movers?.length ?? 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = movers?.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className=' flex flex-col max-w-[1400px] mx-auto items-center mx-auto '>
      <div className=' w-full grid grid-cols-1 xl:grid-cols-2  xl:gap-x-[24px] gap-y-[32px] xl:gap-y-[48px] pt-[40px] pb-[24px]'>
        {currentData?.map((data: Mover) => (
          <div
            key={data.id}
            onClick={() => router.push(`/user/movers/${data.id}`)}
          >
            <MoverInfo
              variant='review'
              subVariant='written'
              moverName={data.moverName}
              movingType={data.movingType}
              isCustomQuote={data.isCustomQuote}
              movingDate={data.movingDate}
              price={data.price}
              reviewContent={data.reviewContent}
              rating={data.rating}
              writtenAt={data.writtenAt}
              imageUrl={data.imageUrl}
            />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className='mx-auto'
        />
      )}
    </div>
  );
}
