'use client';

import { useEffect, useState } from 'react';
import SearchInput from '@/components/common/inputSection/atoms/customInput/inputs/searchInput';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import Area from '@/components/dropdown/cta/area';
import Service from '@/components/dropdown/cta/service';
import { MOVING_TYPES } from '@/constants/movingTypes';
import service from '@/constants/dropdown/service';
import { DropdownCta } from '@/components/dropdown/dropdown';
import axiosInstance from '@/lib/axiosInstance';
import cn from '@/utils/cn';

export type MovingTypeKey = keyof typeof MOVING_TYPES;

interface LoginResponse {
  data: {
    accessToken: string;
  };
}

interface Mover {
  id: number;
  variant: string;
  subVariant: string;
  moverName: string;
  imageUrl: string;
  movingType: MovingTypeKey[];
  isCustomQuote: boolean;
  rating?: number;
  ratingCount: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite?: boolean;
  favoriteCount?: number;
  isFavoriteMoverList?: boolean;
  description?: string;
}

export default function Page() {
  const [movers, setMovers] = useState<Mover[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>('지역');
  const [selectedService, setSelectedService] = useState<string>('서비스');
  const [selectedSort, setSelectedSort] = useState<string>('리뷰 많은순');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [allMovers, setAllMovers] = useState<Mover[]>([]);
  const [favoriteMovers, setFavoriteMovers] = useState<Mover[]>([]);

  const login = async () => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        '/auth/sign-in/customer',
        {
          email: 'test9912@gmail.com',
          password: 'rfradassd15',
        },
      );

      const accessToken = response.data.data?.accessToken;

      if (!accessToken) {
        console.error('액세스 토큰을 찾을 수 없습니다:', response.data);
        return false;
      }

      localStorage.setItem('accessToken', accessToken);
      return true;
    } catch (error: any) {
      console.error('로그인 실패:', error);
      console.error('에러 응답:', error.response?.data);
      console.error('에러 상태:', error.response?.status);
      console.error('에러 메시지:', error.message);
      setError('로그인에 실패했습니다.');
      return false;
    }
  };

  const handleSearch = () => {
    const searchInput = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    const searchTerm = searchInput?.value.trim();

    if (!searchTerm) {
      setMovers(allMovers);
      return;
    }

    const filteredMovers = allMovers.filter((mover) =>
      mover.moverName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setMovers(filteredMovers);
  };

  // 기사님 목록 조회
  const fetchMovers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        const loginSuccess = await login();
        if (!loginSuccess) return;
      }

      const { data } = await axiosInstance.get('/movers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: { sortBy: 'reviews' },
      });

      const moversData = data.data || data;
      setAllMovers(moversData);
      setMovers(moversData);

      // 찜한 기사님 목록 처리
      const favoriteMoversData = moversData
        .filter((mover: Mover) => mover.isFavorite)
        .slice(0, 2);

      setFavoriteMovers(favoriteMoversData);
    } catch (err) {
      console.error('API 호출 오류:', err);
      setError('기사님 목록을 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchMovers();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className='flex flex-col w-full mx-auto gap-6'>
      <div className='xl:flex md:hidden hidden xl:px-[260px] max-h-[96px]'>
        <PageHeader>기사님 찾기</PageHeader>
      </div>

      <div className='relative flex px-6 md:px-[72px] xl:px-[260px] w-full mx-auto gap-[107px]'>
        {/* 데스크탑 */}
        <div className='flex flex-col max-w-[328px] w-full xl:flex md:hidden hidden'>
          <div className='flex flex-col items-center w-full mb-[46px] gap-8'>
            <div className='flex justify-between w-full px-3 py-4 border-b border-gray-200'>
              <p className='text-xl font-semibold'>필터</p>
              <button
                onClick={() => {
                  setSelectedArea('지역');
                  setSelectedService('서비스');
                }}
                className='bg-none text-gray-300 border-none hover:text-gray-500'
              >
                초기화
              </button>
            </div>

            <div className='flex flex-col w-full gap-4'>
              <p className='text-2lg font-semibold'>지역을 선택해주세요</p>
              <Area dispatch={(value) => setSelectedArea(value as string)} />
            </div>

            <div className='flex flex-col w-full gap-4'>
              <p className='text-2lg font-semibold'>
                어떤 서비스가 필요하세요?
              </p>
              <Service
                dispatch={(value) => setSelectedService(value as string)}
              />
            </div>
          </div>

          <div className='flex flex-col w-full gap-4'>
            <p className='text-xl font-semibold'>찜한 기사님</p>

            {favoriteMovers.map((mover) => (
              <MoverInfo
                key={mover.id}
                variant='quote'
                subVariant='completed'
                moverName={mover.moverName}
                imageUrl={mover.imageUrl || '/profile-placeholder.png'}
                movingType={mover.movingType}
                isCustomQuote={mover.isCustomQuote}
                rating={mover.rating ?? 0}
                ratingCount={mover.ratingCount}
                experienceYears={mover.experienceYears}
                quoteCount={mover.quoteCount}
                isFavorite={true}
                favoriteCount={mover.favoriteCount ?? 0}
                isFavoriteMoverList={true}
                description={mover.description}
              />
            ))}
          </div>
        </div>

        {/* 모바일 */}
        <div className='flex flex-col w-full mx-auto'>
          <div className='flex flex-row justify-between w-full my-4 xl:hidden'>
            <div className='flex items-center gap-2'>
              <Area
                className={cn('w-[75px]')}
                dispatch={(value) => setSelectedArea(value as string)}
              />

              <Service
                className={cn('w-[95px]')}
                dispatch={(value) => setSelectedService(value as string)}
              />
            </div>
            <div className='flex items-center'>
              <DropdownCta
                name='review-sort'
                border={false}
                isOpen={false}
                className='w-auto'
                data={[
                  { name: '리뷰 많은순' },
                  { name: '평점 높은순' },
                  { name: '경력 높은순' },
                  { name: '확정 많은순' },
                ]}
                dispatch={(value) => setSelectedSort(value as string)}
              />
            </div>
          </div>

          <div className='relative flex flex-col flex-1 w-full mt-6 gap-6'>
            <div className='flex-row justify-end xl:flex md:hidden hidden'>
              <DropdownCta
                name='review-sort'
                border={false}
                isOpen={false}
                className='w-auto'
                data={[
                  { name: '리뷰 많은순' },
                  { name: '평점 높은순' },
                  { name: '경력 높은순' },
                  { name: '확정 많은순' },
                ]}
                dispatch={(value) => setSelectedSort(value as string)}
              />
            </div>

            <SearchInput
              placeholder='검색어를 입력해 주세요.'
              onSearch={handleSearch}
              styleVariant='secondary'
              inputVariant='search'
            />

            {movers.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-10'>
                <p className='text-gray-500'>검색 결과가 없습니다.</p>
                <button
                  onClick={() => {
                    const searchInput = document.querySelector(
                      'input[type="text"]',
                    ) as HTMLInputElement;
                    if (searchInput) searchInput.value = '';
                    setMovers(allMovers);
                  }}
                  className='mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800'
                >
                  전체 목록 보기
                </button>
              </div>
            ) : (
              movers.map((mover) => (
                <MoverInfo
                  key={mover.id}
                  variant='quote'
                  subVariant='completed'
                  moverName={mover.moverName}
                  imageUrl={mover.imageUrl || '/profile-placeholder.png'}
                  movingType={mover.movingType}
                  isCustomQuote={mover.isCustomQuote}
                  rating={mover.rating ?? 0}
                  ratingCount={mover.ratingCount}
                  experienceYears={mover.experienceYears}
                  quoteCount={mover.quoteCount}
                  isFavorite={mover.isFavorite}
                  favoriteCount={mover.favoriteCount ?? 0}
                  isFavoriteMoverList={false}
                  description={mover.description}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
