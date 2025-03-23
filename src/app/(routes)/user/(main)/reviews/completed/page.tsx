'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import Pagination from '@/components/pagination/molecule/pagination';
import { MOVING_TYPES } from '@/constants/movingTypes';
import Image from 'next/image';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import { id } from 'date-fns/locale';
interface Mover {
  id: string;
  driverName: string;
  movingType: (keyof typeof MOVING_TYPES)[];
  isCustomQuote: boolean;
  movingDate: Date;
  price: number;
  reviewContent: string;
  rating: number;
  writtenAt: Date;
  imageUrl: any;
}

const fetchMovers = async (): Promise<Mover[]> => {
  const response = await fetch(
    `http://localhost:3000/user/reviews/completed/${id}`,
  );
  if (!response.ok) throw new Error('데이터를 불러오는 데 실패했습니다.');
  return response.json();
};

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: movers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movers'],
    queryFn: fetchMovers,
  });

  if (isLoading) return <p className='text-center'> 데이터 불러오는 중...</p>;
  if (error)
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

  // 페이지네이션
  const totalPages = Math.ceil((movers?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = movers?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex flex-col items-center mx-auto'>
      <div className='max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 xl:gap-x-[24px] gap-y-[32px] xl:gap-y-[48px] pt-[40px] pb-[24px]'>
        {currentData.map((data) => (
          <div
            key={data.id}
            className='bg-white'
          >
            <MoverInfo
              variant='review'
              subVariant='written'
              moverName={data.driverName} // 기사이름 //
              movingType={data.movingType} // 이사종류 //
              isCustomQuote={data.isCustomQuote} // 지정견적요청
              movingDate={data.movingDate} //이사날짜 //
              price={data.price} //가격 //
              reviewContent={data.reviewContent} //리뷰내용 //
              rating={data.rating} // 별점 //
              writtenAt={data.writtenAt} //작성일 //
              imageUrl={data.imageUrl} //이미지 //
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
