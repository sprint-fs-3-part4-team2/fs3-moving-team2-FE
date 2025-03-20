'use client';

import { useEffect, useState } from 'react';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import Pagination from '@/components/pagination/molecule/pagination';
import axiosInstance from '@/lib/axiosInstance';

type MovingType = 'small' | 'office' | 'home';

interface Mover {
  id: number;
  moverName: string;
  movingType: MovingType[];
  isCustomQuote: boolean;
  rating: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite: boolean;
  favoriteCount: number;
  ratingCount: number;
  isFavoriteMoverList: boolean;
  profileImage: string;
}

export default function Page() {
  const [movers, setMovers] = useState<Mover[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchFavoriteMovers = async () => {
      try {
        const response = await axiosInstance.get('/favorites');
        setMovers(response.data);
      } catch (error) {
        console.error('Error fetching favorite movers:', error);
      }
    };
    fetchFavoriteMovers();
  }, []);

  const handleFavoriteToggle = async (moverId: number) => {
    const mover = movers.find((m) => m.id === moverId);
    if (!mover) return;
    try {
      if (mover.isFavorite) {
        await axiosInstance.delete(`/favorites/delete`, {
          data: { moverId },
        });
      } else {
        await axiosInstance.post(`/favorites/create`, { moverId });
      }
      setMovers((prevMovers) =>
        prevMovers.map((mover) =>
          mover.id === moverId
            ? {
                ...mover,
                isFavorite: !mover.isFavorite,
                favoriteCount: mover.isFavorite
                  ? mover.favoriteCount - 1
                  : mover.favoriteCount + 1,
              }
            : mover,
        ),
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const favoriteMovers = movers.filter((mover) => mover.isFavorite);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovers = favoriteMovers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full px-[72px] py-8 drop-shadow-lg bg-white text-2lg font-semibold md:px-[260px] md:text-2xl'>
        찜한 기사님
      </div>
      <div className='grid grid-cols-1 gap-12 w-full px-[72px] pb-2 mt-[24px] sm:gap-6 sm:px-[24px] md:gap-8 md:px-[260px] md:grid-cols-2'>
        {currentMovers.map((mover) => (
          <MoverInfo
            key={mover.id}
            {...mover}
            imageUrl={mover.profileImage}
            variant='quote'
            subVariant='completed'
            onFavoriteClick={() => handleFavoriteToggle(mover.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(favoriteMovers.length / itemsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
