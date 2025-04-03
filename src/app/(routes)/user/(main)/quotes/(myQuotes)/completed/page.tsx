'use client';

import { useState, useEffect } from 'react';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
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
  moveType: string;
}

const getAddress = (addresses: Address[], type: 'DEPARTURE' | 'ARRIVAL') => {
  const address = addresses.find((addr) => addr.type === type);
  return address ? `${address.sido} ${address.sigungu}` : '정보 없음';
};

const getMovingTypes = (
  moverServices: MoverService[],
): ('small' | 'office' | 'home')[] => {
  return moverServices.map((service) => {
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
};

const getMovingTypesForMovingInfo = (
  moverServices: MoverService[],
): ('소형이사' | '사무실이사' | '가정이사')[] => {
  return moverServices.map((service) => {
    switch (service.serviceType) {
      case 'SMALL_MOVE':
        return '소형이사';
      case 'OFFICE_MOVE':
        return '사무실이사';
      case 'HOME_MOVE':
        return '가정이사';
      default:
        return '소형이사';
    }
  });
};

const getUserMovingInfo = (
  moveType: string,
): ('소형이사' | '사무실이사' | '가정이사')[] => {
  switch (moveType) {
    case 'SMALL_MOVE':
      return ['소형이사'];
    case 'OFFICE_MOVE':
      return ['사무실이사'];
    case 'HOME_MOVE':
      return ['가정이사'];
    default:
      return ['소형이사'];
  }
};

type Variant = 'quote';
type SubVariant = 'completed';

interface MovingInfoProps {
  requestedDate: Date;
  movingDate: Date;
  movingType: ('소형이사' | '사무실이사' | '가정이사')[];
  departure: string;
  arrival: string;
}

interface MoverInfoProps {
  variant: Variant;
  subVariant: SubVariant;
  moverName: string;
  movingType: ('small' | 'office' | 'home')[];
  isCustomQuote: boolean;
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
  isFavoriteMoverList: boolean;
  imageUrl: string;
  onFavoriteClick: (quoteId: string) => void;
  moverId: string;
  requestedDate: Date;
}

export default function Page() {
  const [quoteRequests, setQuoteRequests] = useState<MovingInfoProps[]>([]);
  const [quotesFromDrivers, setQuotesFromDrivers] = useState<MoverInfoProps[]>(
    [],
  );

  const fetchFavorites = async (): Promise<string[]> => {
    const response = await axiosInstance.get('/favorites');
    if (Array.isArray(response.data.data)) {
      return response.data.data.map((fav: { moverId: string }) => fav.moverId);
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const [favorites, customerRequestsResponse] = await Promise.all([
        fetchFavorites(),
        axiosInstance.get('/quotes/quote-customer-requests'),
      ]);
      const quotes: Quote[] = customerRequestsResponse.data.data;

      if (quotes && Array.isArray(quotes) && quotes.length > 0) {
        const transformedRequests = quotes.map((quote) => ({
          requestedDate: new Date(quote.moveDate),
          movingDate: new Date(quote.moveDate),
          movingType: getUserMovingInfo(quote.moveType),
          departure: getAddress(quote.quoteRequestAddresses, 'DEPARTURE'),
          arrival: getAddress(quote.quoteRequestAddresses, 'ARRIVAL'),
        }));
        setQuoteRequests(transformedRequests);

        const transformedMovers = quotes.flatMap((quote) => {
          return quote.moverQuotes.map((moverQuote: MoverQuote) => {
            const movingTypesForMoverInfo = getMovingTypesForMovingInfo(
              moverQuote.mover.moverServices,
            );
            const movingTypesForMovingInfoProps = getMovingTypes(
              moverQuote.mover.moverServices,
            );
            const isCustomQuote = moverQuote.targetedQuoteRequestId
              ? true
              : false;
            return {
              variant: 'quote' as Variant,
              subVariant: 'completed' as SubVariant,
              moverName: moverQuote.mover.user?.name || '알 수 없음',
              movingType: movingTypesForMovingInfoProps,
              movingTypeForMovingInfo: movingTypesForMoverInfo,
              isCustomQuote: isCustomQuote,
              rating: moverQuote.mover.averageRating,
              experienceYears: moverQuote.mover.experienceYears,
              quoteCount: moverQuote.mover.totalConfirmedCount,
              isFavorite: favorites.includes(moverQuote.mover.id),
              totalCustomerFavorite: moverQuote.mover.totalCustomerFavorite,
              ratingCount: moverQuote.mover.totalReviews,
              price: moverQuote.price,
              quoteId: moverQuote.id,
              movingDate: new Date(quote.moveDate),
              requestedDate: new Date(quote.moveDate),
              departure: getAddress(quote.quoteRequestAddresses, 'DEPARTURE'),
              arrival: getAddress(quote.quoteRequestAddresses, 'ARRIVAL'),
              imageUrl: moverQuote.mover.profileImage,
              moverId: moverQuote.mover.id,
              isFavoriteMoverList: false,
              onFavoriteClick: (moverId: string) =>
                handleFavoriteClick(moverId),
            };
          });
        });
        setQuotesFromDrivers(transformedMovers);
      }
    };
    fetchData();
  }, []);

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

    const quoteIndex = quotesFromDrivers.findIndex(
      (quote) => quote.moverId === moverId,
    );
    if (quoteIndex === -1) return;
    const selectedQuote = quotesFromDrivers[quoteIndex];
    const isCurrentlyFavorite = selectedQuote.isFavorite;
    let apiResponse;
    if (isCurrentlyFavorite) {
      apiResponse = await deleteFavorite(moverId);
    } else {
      apiResponse = await createFavorite(moverId);
    }
    setQuotesFromDrivers((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.moverId === moverId
          ? {
              ...quote,
              isFavorite: !isCurrentlyFavorite,
              totalCustomerFavorite:
                apiResponse?.totalCustomerFavorite ??
                quote.totalCustomerFavorite,
            }
          : quote,
      ),
    );
  };

  return (
    <div className='bg-backgroundVariants-50'>
      <div className='max-w-[1400px] h-[auto] mx-auto rounded-[40px] bg-white'>
        <div className='mt-6 md:mt-8 xl:mt-[64px]'>
          {quoteRequests.map((quote, index) => {
            const relatedQuotes = quotesFromDrivers.filter(
              (mover) =>
                new Date(mover.movingDate).getTime() ===
                new Date(quote.movingDate).getTime(),
            );
            return (
              <div
                key={index}
                className='mb-[6px] py-[16px] px-[24px] rounded-[24px] border shadow-lg 
              md:mb-4 md:py-[16px] md:px-[32px] md:rounded-[24px]
              xl:mb-8 xl:py-[40px] xl:px-[48px] xl:rounded-[40px]'
              >
                <MovingInfo
                  requestedDate={quote.requestedDate}
                  movingDate={quote.movingDate}
                  movingType={quote.movingType.join(', ')}
                  departure={quote.departure}
                  arrival={quote.arrival}
                />
                <div className='mt-8'>
                  <p className='text-lg md:mt-12 md:mb-10 xl:text-2xl text-black-400 font-semibold mt-8 mb-6'>
                    견적서 목록
                  </p>
                  {relatedQuotes.length > 0 ? (
                    relatedQuotes.map((mover) => (
                      <div
                        className='mb-2 md:mb-4 xl:mb-9'
                        key={mover.moverId}
                      >
                        <MoverInfo
                          {...mover}
                          imageUrl={mover.imageUrl}
                          favoriteCount={mover.totalCustomerFavorite ?? 0}
                          ratingCount={mover.ratingCount ?? 0}
                          onFavoriteClick={() =>
                            handleFavoriteClick(mover.moverId)
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <p className='text-gray-500'>견적이 없습니다.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
