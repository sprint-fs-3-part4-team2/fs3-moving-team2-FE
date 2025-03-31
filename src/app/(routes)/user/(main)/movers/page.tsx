'use client';

import { useEffect, useState } from 'react';
import SearchInput from '@/components/common/inputSection/atoms/customInput/inputs/searchInput';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import Area from '@/components/dropdown/cta/area';
import Service from '@/components/dropdown/cta/service';
import { MOVING_TYPES } from '@/constants/movingTypes';
import { DropdownCta } from '@/components/dropdown/dropdown';

import cn from '@/utils/cn';
import axiosInstance from '@/lib/axiosInstance';

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
  const [selectedSort, setSelectedSort] = useState<string>('reviews');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [allMovers, setAllMovers] = useState<Mover[]>([]);
  const [favoriteMovers, setFavoriteMovers] = useState<Mover[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        '/auth/sign-in/customer',
        {
          email: 'test9912@gmail.com',
          password: 'rfradassd15',
        },
      );

      const accessToken = response.data.data.accessToken;

      if (!accessToken) {
        console.error('액세스 토큰을 찾을 수 없습니다:', response.data);
        return false;
      }

      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error('로그인 실패:', error);
      setError('로그인에 실패했습니다.');
      setIsAuthenticated(false);
      return false;
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return await login();
    }
    return true;
  };

  const handleSearch = async () => {
    const searchInput = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    const searchTerm = searchInput?.value.trim();

    if (!searchTerm) {
      setMovers(allMovers);
      return;
    }

    if (searchTerm.length < 2) {
      setError('검색어는 2자 이상이어야 합니다.');
      return;
    }

    try {
      const isAuth = await checkAuth();
      if (!isAuth) return;

      const { data } = await axiosInstance.get('/movers/search', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: { keyword: searchTerm },
      });

      const moversData = data.data || data;
      setMovers(moversData);
      setAllMovers(moversData);

      const favoriteMoversData = moversData
        .filter((mover: Mover) => mover.isFavorite)
        .slice(0, 2);

      setFavoriteMovers(favoriteMoversData);
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setError('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.error('검색 중 오류 발생:', err);
        setError('기사님 검색 중 오류가 발생했습니다.');
      }
    }
  };

  const handleSort = async (value: string | object) => {
    const sortValue = typeof value === 'string' ? value : 'reviews';
    setSelectedSort(sortValue);
    try {
      const isAuth = await checkAuth();
      if (!isAuth) return;

      const { data } = await axiosInstance.get('/movers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: { sortBy: sortValue },
      });

      const moversData = data.data || data;
      setAllMovers(moversData);
      setMovers(moversData);

      const favoriteMoversData = moversData
        .filter((mover: Mover) => mover.isFavorite)
        .slice(0, 2);

      setFavoriteMovers(favoriteMoversData);
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setError('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.error('정렬 중 오류 발생:', err);
        setError('기사님 목록을 불러오는 중 오류가 발생했습니다.');
      }
    }
  };

  const fetchMovers = async () => {
    try {
      const isAuth = await checkAuth();
      if (!isAuth) return;

      const { data } = await axiosInstance.get('/movers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          sortBy: selectedSort,
          area: selectedArea !== '지역' ? selectedArea : undefined,
          service: selectedService !== '서비스' ? selectedService : undefined,
        },
      });

      const moversData = data.data || data;
      setAllMovers(moversData);
      setMovers(moversData);

      const favoriteMoversData = moversData
        .filter((mover: Mover) => mover.isFavorite)
        .slice(0, 2);

      setFavoriteMovers(favoriteMoversData);
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setError('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        console.error('API 호출 오류:', err);
        setError('기사님 목록을 불러오는 중 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    fetchMovers();
  }, [selectedArea, selectedService, selectedSort]);

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
                allbtn={false}
                className='w-auto'
                data={[
                  { name: '리뷰 많은순' },
                  { name: '평점 높은순' },
                  { name: '확정 많은순' },
                  { name: '경력 높은순' },
                ]}
                dispatch={(value) => {
                  const sortMap: { [key: string]: string } = {
                    '리뷰 많은순': 'reviews',
                    '평점 높은순': 'rating',
                    '확정 많은순': 'confirmed',
                    '경력 높은순': 'experience',
                  };
                  handleSort(sortMap[value as string] || 'reviews');
                }}
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
                  { name: '확정 많은순' },
                  { name: '경력 높은순' },
                ]}
                dispatch={(value) => {
                  const sortMap: { [key: string]: string } = {
                    '리뷰 많은순': 'reviews',
                    '평점 높은순': 'rating',
                    '확정 많은순': 'confirmed',
                    '경력 높은순': 'experience',
                  };
                  handleSort(sortMap[value as string] || 'reviews');
                }}
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
