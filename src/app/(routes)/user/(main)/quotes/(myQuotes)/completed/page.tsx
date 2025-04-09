'use client';

import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import axiosInstance from '@/lib/axiosInstance';
import NoData from '@/components/noData/NoData';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as quotesList from '@/services/types/quotesList/quotesList';
import * as completedApi from '@/services/quotesList';

export default function Page() {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: completedApi.fetchFavorites,
  });

  const { data: quotes = [] } = useQuery({
    queryKey: ['customerQuotes'],
    queryFn: completedApi.fetchCustomerQuotes,
  });

  const quoteRequests = quotes.map((quote) => ({
    requestedDate: new Date(quote.moveDate),
    movingDate: new Date(quote.moveDate),
    movingType: quotesList.getUserMovingInfo(quote.moveType),
    departure: quotesList.getAddress(quote.quoteRequestAddresses, 'DEPARTURE'),
    arrival: quotesList.getAddress(quote.quoteRequestAddresses, 'ARRIVAL'),
    moverQuotes: quote.moverQuotes,
  }));

  const quotesFromDrivers = quotes.flatMap((quote) =>
    quote.moverQuotes.map((moverQuote) => {
      return {
        variant: 'quote' as quotesList.Variant,
        subVariant: 'completed' as quotesList.SubVariant,
        moverId: moverQuote.mover.id,
        moverName: moverQuote.mover.user?.name || '알 수 없음',
        movingType: quotesList.getMovingTypes(moverQuote.mover.moverServices),
        isCustomQuote: !!moverQuote.targetedQuoteRequestId,
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
        departure: quotesList.getAddress(
          quote.quoteRequestAddresses,
          'DEPARTURE',
        ),
        arrival: quotesList.getAddress(quote.quoteRequestAddresses, 'ARRIVAL'),
        imageUrl: moverQuote.mover.profileImage,
        isFavoriteMoverList: false,
        onFavoriteClick: () => handleFavoriteClick(moverQuote.mover.id),
      };
    }),
  );

  const handleFavoriteClick = async (moverId: string) => {
    const isFavorite = favorites.includes(moverId);
    if (isFavorite) {
      await axiosInstance.delete(`/favorites/delete/${moverId}`);
    } else {
      await axiosInstance.post(`/favorites/create/${moverId}`);
    }
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
    queryClient.invalidateQueries({ queryKey: ['customerQuotes'] });
  };

  return (
    <div className='h-auto bg-purple-950'>
      <div className='bg-primary-blue-400'>
        {quoteRequests.length === 0 && quotesFromDrivers.length === 0 ? (
          <div className='flex justify-center items-center max-w-[1400px] mx-auto h-[calc(100vh-(54px+54px+2px))] xl:h-[calc(100vh-(84px+88px+4px))]'>
            <div className='flex flex-col justify-center items-center w-full text-center'>
              <NoData text='받았던 견적이 없습니다.' />
            </div>
          </div>
        ) : (
          <div className='max-w-[1400px] mx-auto xl:h-[calc(100vh-(84px+88px+4px))] py-6 md:py-8 md:px-[72px] xl:px-0 xl:py-[64px]'>
            {quoteRequests.map((quote, index) => {
              return (
                <div
                  key={index}
                  className='pb-[6px] py-[16px] px-[24px] rounded-[24px] border shadow-lg bg-white 
                  md:pb-4 md:py-[16px] md:px-[32px] md:rounded-[24px]
                  xl:pb-8 xl:py-[40px] xl:px-[48px] xl:rounded-[40px]'
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
                    {quotesFromDrivers.length > 0 ? (
                      quotesFromDrivers.map((mover) => (
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
                      <p className='text-center text-grayscale-400 mt-8 text-2xl font-normal'>
                        견적이 없습니다.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
