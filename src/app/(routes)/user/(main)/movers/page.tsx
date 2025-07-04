'use client';

import { useEffect, useState } from 'react';
import SearchInput from '@/components/common/inputSection/atoms/customInput/inputs/searchInput';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import { MOVING_TYPES } from '@/constants/movingTypes';
import { DropdownCta } from '@/components/dropdown/dropdown';
import { Mover, searchMovers, getMovers } from '@/services/moverService';
import MoverList from '@/components/movers/MoverList';
import MoverFilters from '@/components/movers/MoverFilters';
import FavoriteMovers from '@/components/movers/FavoriteMovers';
import useUserProfile from '@/hooks/auth/useUserProfile';
import { useToaster } from '@/hooks/useToaster';
import { useQuery } from '@tanstack/react-query';

export type MovingTypeKey = keyof typeof MOVING_TYPES;

export default function Page() {
  const [movers, setMovers] = useState<Mover[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>('지역');
  const [selectedService, setSelectedService] = useState<string>('서비스');
  const [selectedSort, setSelectedSort] = useState<string>('reviews');
  const [error, setError] = useState<string | null>(null);
  const [allMovers, setAllMovers] = useState<Mover[]>([]);
  const [favoriteMovers, setFavoriteMovers] = useState<Mover[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: profile } = useUserProfile();
  const toast = useToaster();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setMovers(allMovers);
      return;
    }

    if (searchQuery.length < 2) {
      // setError('검색어는 2자 이상이어야 합니다.');
      toast('warn', '검색어는 2자 이상이어야 합니다.');
      return;
    }

    try {
      const moversData = await searchMovers(searchQuery);
      setMovers(moversData);
      setError(null);
    } catch (err: any) {
      console.error('검색 중 오류 발생:', err);
      // setError('기사님 검색 중 오류가 발생했습니다.');
      toast('warn', '기사님 검색 중 오류가 발생했습니다.');
    }
  };

  // 목록 초기화
  const handleReset = () => {
    setSelectedArea('지역');
    setSelectedService('서비스');
    setSelectedSort('reviews');
    fetchMovers();
    setSearchQuery('');
  };

  // 정렬
  const handleSort = async (value: string | object) => {
    const sortValue = typeof value === 'string' ? value : 'reviews';
    setSelectedSort(sortValue);
    try {
      const moversData = await getMovers({ sortBy: sortValue });
      setAllMovers(moversData);
      setMovers(moversData);
    } catch (err: any) {
      console.error('정렬 중 오류 발생:', err);
      // setError('기사님 목록을 불러오는 중 오류가 발생했습니다.');
      toast('warn', '기사님 목록을 불러오는 중 오류가 발생했습니다.');
    }
  };

  // 기사님 목록 가져오기
  const fetchMovers = async () => {
    try {
      const moversData = await getMovers({
        sortBy: selectedSort,
        area: selectedArea !== '지역' ? selectedArea : undefined,
        service: selectedService !== '서비스' ? selectedService : undefined,
      });

      setAllMovers(moversData);
      setMovers(moversData);

      // 찜한 기사님 목록 불러오기
      const favoriteMoversData = moversData
        .filter((mover: Mover) => mover.isFavorite)
        .slice(0, 2);
      setFavoriteMovers(favoriteMoversData);
    } catch (err: any) {
      console.error('API 호출 오류:', err);
      // setError('기사님 목록을 불러오는 중 오류가 발생했습니다.');
      toast('warn', '기사님 목록을 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchMovers();
  }, [selectedArea, selectedService, selectedSort]);

  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className='flex flex-col w-full md:px-[72px] xl:max-w-[1400px] mx-auto gap-6'>
      <div className='xl:flex md:hidden hidden max-h-[96px]'>
        <PageHeader>기사님 찾기</PageHeader>
      </div>

      <div className='relative flex px-6 w-full mx-auto gap-[107px]'>
        {/* 데스크탑 */}
        <div className='flex flex-col max-w-[328px] w-full xl:flex mx-auto md:hidden hidden'>
          <MoverFilters
            selectedArea={selectedArea}
            selectedService={selectedService}
            onAreaChange={setSelectedArea}
            onServiceChange={setSelectedService}
            onSortChange={handleSort}
          />
          <FavoriteMovers favoriteMovers={favoriteMovers} />
        </div>

        {/* 모바일 */}
        <div className='flex flex-col w-full mx-auto'>
          <MoverFilters
            selectedArea={selectedArea}
            selectedService={selectedService}
            onAreaChange={setSelectedArea}
            onServiceChange={setSelectedService}
            onSortChange={handleSort}
            isMobile
          />

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
              onSearch={() => {}}
              styleVariant='secondary'
              inputVariant='search'
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value === '') {
                  handleReset();
                } else {
                  handleSearch();
                }
              }}
            />

            <MoverList
              movers={movers}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
