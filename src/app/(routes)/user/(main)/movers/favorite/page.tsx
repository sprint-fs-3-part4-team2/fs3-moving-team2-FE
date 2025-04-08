'use client';

import { useEffect, useState } from 'react';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import Pagination from '@/components/pagination/molecule/pagination';
import axiosInstance from '@/lib/axiosInstance';
import Image from 'next/image';
import fileImg from '@/public/img/no-review.svg';

interface MoverService {
  id: string;
  moverId: string;
  serviceType: 'SMALL_MOVE' | 'OFFICE_MOVE' | 'HOME_MOVE';
  createdAt: string;
}

interface Mover {
  id: string;
  moverId: string;
  profileImage: string;
  experienceYears: number;
  description: string;
  averageRating: number;
  ratingCount: number;
  quoteCount: number;
  isCustomQuote: boolean;
  isFavorite: boolean;
  isFavoriteMoverList: boolean;
  totalCustomerFavorite: number;
  moverName: string;
  movingType: ('small' | 'office' | 'home')[];
  moverServices: MoverService[];
}

export default function Page() {
  const [movers, setMovers] = useState<Mover[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchFavorites = async (): Promise<Mover[]> => {
    const response = await axiosInstance.get('/favorites');
    if (Array.isArray(response.data.data)) {
      return response.data.data.map((item: any) => {
        const mover = item.mover;
        const movingTypes: ('small' | 'office' | 'home')[] =
          mover.moverServices.map((service: any) => {
            switch (service.serviceType) {
              case 'SMALL_MOVE':
                return 'small';
              case 'OFFICE_MOVE':
                return 'office';
              case 'HOME_MOVE':
                return 'home';
              default:
                return 'small';
            }
          });
        return {
          id: item.id,
          moverId: mover.id,
          moverName: mover.user.name || '알 수 없음',
          movingType: movingTypes,
          isCustomQuote: false,
          profileImage: mover.profileImage,
          experienceYears: mover.experienceYears,
          averageRating: mover.averageRating || 0,
          ratingCount: mover.totalReviews,
          quoteCount: mover.totalConfirmedCount || 0,
          isFavorite: true,
          isFavoriteMoverList: false,
          totalCustomerFavorite: mover.totalCustomerFavorite || 0,
          moverServices: mover.moverServices,
        };
      });
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const favorites = await fetchFavorites();
      setMovers(favorites);
    };
    fetchData();
  }, []);

  const handleFavoriteClick = async (moverId: string): Promise<void> => {
    const mover = movers.find((mover) => mover.moverId === moverId);
    if (mover?.isFavorite) {
      const response = await axiosInstance.delete(
        `/favorites/delete/${moverId}`,
      );
      const updatedMover = response.data;
      setMovers((prevMovers) => {
        const updatedMovers = prevMovers.map((mover) =>
          mover.moverId === moverId
            ? {
                ...mover,
                isFavorite: false,
                totalCustomerFavorite: updatedMover.totalCustomerFavorite,
              }
            : mover,
        );
        const filteredMovers = updatedMovers.filter(
          (mover) => mover.isFavorite,
        );
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const currentPageMovers = filteredMovers.slice(startIndex, endIndex);
        if (currentPageMovers.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        return filteredMovers;
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovers = movers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {movers.length === 0 ? (
        <div className='flex flex-col items-center overflow-y-hidden bg-backgroundVariants-50'>
          <div className='w-full drop-shadow-lg  text-2lg font-semibold bg-white py-[14px] px-[30px] md:py-[14px] xl:py-8 md:px-[72px] xl:px-[260px] md:text-2lg xl:text-2xl'>
            찜한 기사님
          </div>
          <div className='flex flex-col justify-center items-center w-full h-[calc(100vh-(54.8px+54px+2px))] xl:h-[calc(100vh-(84px+96px+1px))] px-6 md:px-[72px] xl:px-0'>
            <Image
              className='w-[110px] h-[82px] xl:w-[184px] xl:h-[136px]'
              src={fileImg}
              alt='무빙 파일 이미지'
            />
            <p className='text-center text-grayscale-400 mt-6 text-lg font-normal md:text-lg xl:text-2xl xl:mt-8'>
              찜한 기사님이 없습니다.
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center bg-backgroundVariants-50'>
          <div className='w-full drop-shadow-lg  text-2lg font-semibold bg-white py-[14px] px-[30px] md:py-[14px] xl:py-8 md:px-[72px] xl:px-[260px] md:text-2lg xl:text-2xl'>
            찜한 기사님
          </div>
          <div className='h-[calc(100vh-(54.8px+54px+2px))] w-full max-w-[1400px] mx-auto sm:mt-4 md:mt-6 xl:mt-6 sm:px-[24px] md:px-[72px] xl:px-0'>
            <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
              {currentMovers.map((mover) => (
                <div
                  key={mover.id}
                  className='bg-white'
                >
                  <MoverInfo
                    variant='quote'
                    subVariant='completed'
                    moverName={mover.moverName}
                    movingType={mover.movingType}
                    isCustomQuote={mover.isCustomQuote}
                    rating={mover.averageRating}
                    experienceYears={mover.experienceYears}
                    quoteCount={mover.quoteCount}
                    isFavorite={mover.isFavorite}
                    favoriteCount={mover.totalCustomerFavorite}
                    ratingCount={mover.ratingCount}
                    isFavoriteMoverList={mover.isFavoriteMoverList}
                    imageUrl={mover.profileImage}
                    onFavoriteClick={() => handleFavoriteClick(mover.moverId)}
                  />
                </div>
              ))}
            </div>
            <div className='flex justify-center items-center pt-2 md:pt-8 xl:pt-6'>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(movers.length / itemsPerPage)}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
