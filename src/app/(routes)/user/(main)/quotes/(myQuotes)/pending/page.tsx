'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import Pagination from '@/components/pagination/molecule/pagination';
import axiosInstance from '@/lib/axiosInstance';
import Image from 'next/image';
import fileImg from '@/public/img/no-review.svg';

interface Address {
  id: string;
  quoteRequestId: string;
  sido: string;
  sigungu: string;
  street: string;
  fullAddress: string;
  type: 'DEPARTURE' | 'ARRIVAL';
}

interface Mover {
  id: string;
  userId: string;
  profileImage: string;
  experienceYears: number;
  introduction: string;
  description: string;
  averageRating: number;
  totalReviews: number;
  totalCustomerFavorite: number;
  totalConfirmedCount: number;
  createdAt: string;
  updatedAt: string;
  moverServices: MoverService[];
  user: User;
}

interface User {
  id: string;
  userType: string;
  email: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface MoverService {
  id: string;
  moverId: string;
  serviceType: 'SMALL_MOVE' | 'OFFICE_MOVE' | 'HOME_MOVE';
  createdAt: string;
}

interface MoverQuote {
  id: string;
  moverId: string;
  quoteRequestId: string;
  price: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  mover: Mover;
  targetedQuoteRequestId: string;
}

interface Quote {
  moveDate: string;
  quoteRequestAddresses: Address[];
  moverQuotes: MoverQuote[];
}

type QuoteState = 'confirmedQuote' | 'pendingQuote';
type Variant = 'quote';
type SubVariant = 'pending';

interface MoverInfoTemplateProps {
  variant: Variant;
  subVariant: SubVariant;
  moverName: string;
  movingType: ('small' | 'office' | 'home')[];
  isCustomQuote: boolean;
  quoteState: QuoteState;
  rating: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite: boolean;
  totalCustomerFavorite: number;
  ratingCount: number;
  price: number;
  quoteId: string;
  movingDate: Date;
  departure: string;
  arrival: string;
  imageUrl: string;
  onConfirmClick: () => void;
  onDetailClick?: () => void;
  onFavoriteClick: (quoteId: string) => void;
  moverId: string;
}

export default function Page() {
  const router = useRouter();
  const [movers, setMovers] = useState<MoverInfoTemplateProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchFavorites = async (): Promise<string[]> => {
    const response = await axiosInstance.get('/favorites');
    if (Array.isArray(response.data.data)) {
      return response.data.data.map((fav: { moverId: string }) => fav.moverId);
    }
    return [];
  };

  useEffect(() => {
    const fetchPendingQuotes = async () => {
      const [favorites, response] = await Promise.all([
        fetchFavorites(),
        axiosInstance.get('/quote/pending-quotes'),
      ]);
      const quotes: Quote = response.data.data;
      if (quotes && Array.isArray(quotes.moverQuotes)) {
        const transformedMovers = quotes.moverQuotes.map(
          (moverQuote: MoverQuote) => {
            const movingTypes: ('small' | 'office' | 'home')[] =
              moverQuote.mover.moverServices.map((service) => {
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
            const isCustomQuote = moverQuote.targetedQuoteRequestId
              ? true
              : false;
            return {
              variant: 'quote' as Variant,
              subVariant: 'pending' as SubVariant,
              moverName: moverQuote.mover.user?.name || '알 수 없음',
              movingType: movingTypes,
              isCustomQuote: isCustomQuote,
              quoteState: 'pendingQuote' as QuoteState,
              rating: moverQuote.mover.averageRating,
              experienceYears: moverQuote.mover.experienceYears,
              quoteCount: moverQuote.mover.totalConfirmedCount,
              isFavorite: favorites.includes(moverQuote.mover.id),
              totalCustomerFavorite: moverQuote.mover.totalCustomerFavorite,
              ratingCount: moverQuote.mover.totalReviews,
              price: moverQuote.price,
              quoteId: moverQuote.id,
              movingDate: new Date(quotes.moveDate),
              departure: `${quotes.quoteRequestAddresses.find((addr) => addr.type === 'DEPARTURE')?.sido} ${
                quotes.quoteRequestAddresses.find(
                  (addr) => addr.type === 'DEPARTURE',
                )?.sigungu
              }`,
              arrival: `${quotes.quoteRequestAddresses.find((addr) => addr.type === 'ARRIVAL')?.sido} ${
                quotes.quoteRequestAddresses.find(
                  (addr) => addr.type === 'ARRIVAL',
                )?.sigungu
              }`,
              imageUrl: moverQuote.mover.profileImage,
              moverId: moverQuote.mover.id,
              onConfirmClick: () => handleConfirmClick(moverQuote.id),
              onDetailClick: () =>
                router.push(`/user/quotes/${moverQuote.mover.id}`),
              onFavoriteClick: (moverId: string) =>
                handleFavoriteClick(moverId),
            };
          },
        );
        setMovers(transformedMovers);
      }
    };
    fetchPendingQuotes();
  }, []);

  const handleConfirmClick = async (quoteId: string) => {
    const response = await axiosInstance.post(
      `/quote/confirm-quote/${quoteId}`,
    );
    if (response.status === 200) {
      alert('견적이 확정되었습니다.');
      setMovers((prevMovers) =>
        prevMovers.filter((mover) => mover.quoteId !== quoteId),
      );
    } else {
      alert('견적 확정에 실패했습니다.');
    }
  };

  const handleFavoriteClick = async (moverId: string) => {
    const createFavorite = async (moverId: string) => {
      const response = await axiosInstance.post(`/favorites/create/${moverId}`);
      return response.data;
    };

    const deleteFavorite = async (moverId: string) => {
      const response = await axiosInstance.delete(
        `/favorites/delete/${moverId}`,
      );
      return response.data;
    };

    const moverIndex = movers.findIndex((mover) => mover.moverId === moverId);
    if (moverIndex === -1) return;
    const selectedMover = movers[moverIndex];
    const isCurrentlyFavorite = selectedMover.isFavorite;
    let apiResponse;
    if (isCurrentlyFavorite) {
      apiResponse = await deleteFavorite(moverId);
    } else {
      apiResponse = await createFavorite(moverId);
    }
    setMovers((prevMovers) =>
      prevMovers.map((mover) =>
        mover.moverId === moverId
          ? {
              ...mover,
              isFavorite: !isCurrentlyFavorite,
              totalCustomerFavorite:
                apiResponse?.totalCustomerFavorite ??
                mover.totalCustomerFavorite,
            }
          : mover,
      ),
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovers = movers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className='max-w-[1400px] mx-auto px-6 py-[32px] md:px-[72px] xl:py-[40px] xl:px-0'>
        {currentMovers.length === 0 ? (
          <div className='flex flex-col justify-center items-center w-full mx-auto'>
            <Image
              className='w-[100px] h-[100px] md:w-[250px] md:h-[250px] xl:w-[400px] xl:h-[400px]'
              src={fileImg}
              alt='무빙 차량 이미지'
            />
            <p className='mt-5 text-center text-xl font-semibold text-gray-500'>
              대기 중인 견적이 없습니다.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
            {currentMovers.map((mover) => (
              <MoverInfo
                key={mover.quoteId}
                {...mover}
                imageUrl={mover.imageUrl}
                favoriteCount={mover.totalCustomerFavorite ?? 0}
                ratingCount={mover.ratingCount ?? 0}
                onFavoriteClick={() => handleFavoriteClick(mover.moverId)}
              />
            ))}
          </div>
        )}
      </div>
      <div className='flex justify-center items-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(movers.length / itemsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}
