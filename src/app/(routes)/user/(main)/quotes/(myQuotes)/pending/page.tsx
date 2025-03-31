'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import Pagination from '@/components/pagination/molecule/pagination';
import axiosInstance from '@/lib/axiosInstance';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    const checkLogin = async () => {
      await axiosInstance.get(
        '/auth/fakeSignIn?userId=cm8sc9j9q0012uzks94fmpzu5&roleId=cm8sc9jeg003wuzksdt8q4ngq&type=customer',
      );
      setIsLoggedIn(true);
    };
    checkLogin().catch(() => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchPendingQuotes = async () => {
        try {
          const response = await axiosInstance.get('/quote/pending-quotes');
          const data = response.data;
          const quotes: Quote = data.data;
          console.log('quotes:', quotes);
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
                return {
                  variant: 'quote' as Variant,
                  subVariant: 'pending' as SubVariant,
                  moverName: moverQuote.mover.introduction,
                  movingType: movingTypes,
                  isCustomQuote: false,
                  quoteState: 'pendingQuote' as QuoteState,
                  rating: moverQuote.mover.averageRating,
                  experienceYears: moverQuote.mover.experienceYears,
                  quoteCount: moverQuote.mover.totalConfirmedCount,
                  isFavorite: false,
                  totalCustomerFavorite: moverQuote.mover.totalCustomerFavorite,
                  ratingCount: moverQuote.mover.totalReviews,
                  price: moverQuote.price,
                  quoteId: moverQuote.id,
                  movingDate: new Date(quotes.moveDate),
                  departure: `${
                    quotes.quoteRequestAddresses.find(
                      (addr) => addr.type === 'DEPARTURE',
                    )?.sido
                  } ${
                    quotes.quoteRequestAddresses.find(
                      (addr) => addr.type === 'DEPARTURE',
                    )?.sigungu
                  }`,
                  arrival: `${
                    quotes.quoteRequestAddresses.find(
                      (addr) => addr.type === 'ARRIVAL',
                    )?.sido
                  } ${
                    quotes.quoteRequestAddresses.find(
                      (addr) => addr.type === 'ARRIVAL',
                    )?.sigungu
                  }`,
                  imageUrl: moverQuote.mover.profileImage,
                  moverId: moverQuote.mover.id,
                  onConfirmClick: () => handleConfirmClick(moverQuote.id),
                  onDetailClick: () =>
                    router.push(`/user/quotes/${moverQuote.id}`),
                  onFavoriteClick: (moverId: string) =>
                    handleFavoriteClick(moverId),
                };
              },
            );
            setMovers(transformedMovers);
          }
        } catch (error) {
          console.error('Error fetching quotes:', error);
        }
      };
      fetchPendingQuotes();
    }
  }, [isLoggedIn]);

  const handleConfirmClick = async (quoteId: string) => {
    try {
      const response = await axiosInstance.post(
        `/quote/confirm-quote/${quoteId}`,
      );
      if (response.status === 200) {
        alert('견적이 확정되었습니다.');
        setMovers((prevMovers) =>
          prevMovers.filter((mover) => mover.quoteId !== quoteId),
        );
      }
    } catch (error) {
      console.error('Error confirming quote:', error);
      alert('견적 확정에 실패했습니다.');
    }
  };

  // 찜하기 버튼 클릭 시
  const handleFavoriteClick = async (moverId: string) => {
    console.log('하트 클릭 moverID:', moverId); // 디버깅
    // 상태 업데이트 전 콘솔
    console.log('movers1:', movers);
    const updatedMovers = movers.map((mover) =>
      mover.moverId === moverId
        ? {
            ...mover,
            isFavorite: !mover.isFavorite,
            totalCustomerFavorite: mover.isFavorite
              ? mover.totalCustomerFavorite - 1
              : mover.totalCustomerFavorite + 1,
          }
        : mover,
    );
    console.log('Updated movers:', updatedMovers);
    const selectedMover = updatedMovers.find(
      (mover) => mover.moverId === moverId,
    );
    console.log(updatedMovers);
    if (!selectedMover) return;
    console.log('b');
    const apiEndpoint = selectedMover.isFavorite
      ? `/favorites/create/${moverId}`
      : `/favorites/delete/${moverId}`;
    console.log(`Calling API endpoint: ${apiEndpoint}`); // 디버깅
    try {
      const response = await axiosInstance.post(apiEndpoint);
      console.log('API response:', response); // 디버깅
      if (response.status === 201 || response.status === 200) {
        setMovers(updatedMovers);
        console.log('상태 업데이트 후:', updatedMovers); // 디버깅
      } else {
        alert('찜하기 상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error with favorite API:', error);
      alert('찜하기 상태 변경에 실패했습니다.');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovers = movers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className='grid grid-cols-1 gap-6 py-[32px] max-w-[1400px] mx-auto xl:py-[40px] xl:grid-cols-2'>
        {currentMovers.map((mover) => (
          <MoverInfo
            key={mover.quoteId}
            {...mover}
            imageUrl={mover.imageUrl}
            favoriteCount={mover.totalCustomerFavorite ?? 0}
            ratingCount={mover.ratingCount ?? 0}
            onFavoriteClick={() => mover.onFavoriteClick(mover.moverId)}
          />
        ))}
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
