'use client';

import { useState, useEffect } from 'react';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';

interface SharedInfoProps {
  requestedDate: Date;
  movingDate: Date;
  departure: string;
  arrival: string;
  border: boolean;
  isOpen: boolean;
  data: { name: string }[];
  name: string;
  dispatch: () => void;
  moverName: string;
  isCustomQuote: boolean;
  quoteState: 'confirmedQuote' | 'pendingQuote';
  rating: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite: boolean;
  favoriteCount: number;
  ratingCount: number;
  price: number;
  description: string;
}

interface MovingInfoProps extends SharedInfoProps {
  movingType: '소형이사' | '사무실이사' | '가정이사';
}

interface MoverInfoProps extends SharedInfoProps {
  movingType: ('small' | 'office' | 'home')[];
  isFavoriteMoverList: boolean;
}

export default function Page() {
  const [randomData, setRandomData] = useState<SharedInfoProps>({
    requestedDate: new Date(),
    movingDate: new Date(),
    departure: '',
    arrival: '',
    border: false,
    isOpen: false,
    data: [],
    name: '',
    dispatch: () => {},
    moverName: '',
    isCustomQuote: false,
    quoteState: 'pendingQuote',
    rating: 0,
    experienceYears: 0,
    quoteCount: 0,
    isFavorite: false,
    favoriteCount: 0,
    ratingCount: 0,
    price: 0,
    description: '',
  });

  const [movingType, setMovingType] = useState<'small' | 'office' | 'home'>(
    'small',
  );
  const movingTypeMapping: Record<
    'small' | 'office' | 'home',
    '소형이사' | '사무실이사' | '가정이사'
  > = {
    small: '소형이사',
    office: '사무실이사',
    home: '가정이사',
  };

  useEffect(() => {
    setRandomData({
      requestedDate: new Date(),
      movingDate: new Date(),
      departure:
        '서울 ' + ['강남구', '서초구', '마포구'][Math.floor(Math.random() * 3)],
      arrival:
        '경기도 ' +
        ['성남시', '수원시', '용인시'][Math.floor(Math.random() * 3)],
      border: false,
      isOpen: Math.random() > 0.5,
      data: [{ name: '확정한 견적서' }],
      name: '랜덤 드롭다운',
      dispatch: () => console.log('드롭다운 선택 변경'),
      moverName: '김코드 ' + Math.floor(Math.random() * 100),
      isCustomQuote: Math.random() > 0.5,
      quoteState: Math.random() > 0.5 ? 'confirmedQuote' : 'pendingQuote',
      rating: Math.floor(Math.random() * 5) + 1,
      experienceYears: Math.floor(Math.random() * 10) + 1,
      quoteCount: Math.floor(Math.random() * 500) + 1,
      isFavorite: Math.random() > 0.5,
      favoriteCount: Math.floor(Math.random() * 1000) + 1,
      ratingCount: Math.floor(Math.random() * 1000) + 1,
      price: Math.floor(Math.random() * 100000) + 30000,
      description: '최선을 다해 모시겠습니다!',
    });

    const randomMovingType: 'small' | 'office' | 'home' = [
      'small',
      'office',
      'home',
    ][Math.floor(Math.random() * 3)] as 'small' | 'office' | 'home';
    setMovingType(randomMovingType);
  }, []);

  return (
    <div className='max-w-[1400px] h-[auto] mx-auto rounded-[40px]'>
      <div className='mt-4 xl:mt-12'>
        <MovingInfo
          requestedDate={randomData.requestedDate}
          movingDate={randomData.movingDate}
          movingType={movingTypeMapping[movingType]}
          departure={randomData.departure}
          arrival={randomData.arrival}
        />
      </div>
      <div>
        <p className='text-lg md:mt-12 md:mb-10 xl:text-2xl text-black-400 font-semibold mt-8 mb-6'>
          견적서 목록
        </p>
        <div className='mt-8'>
          <MoverInfo
            imageUrl={null}
            variant='quote'
            subVariant='completed'
            moverName={randomData.moverName}
            movingType={[movingType]}
            isCustomQuote={randomData.isCustomQuote}
            quoteState={randomData.quoteState}
            rating={randomData.rating}
            experienceYears={randomData.experienceYears}
            quoteCount={randomData.quoteCount}
            isFavorite={randomData.isFavorite}
            favoriteCount={randomData.favoriteCount}
            ratingCount={randomData.ratingCount}
            price={randomData.price}
            isFavoriteMoverList={false}
            description={randomData.description}
          />
        </div>
      </div>
    </div>
  );
}
