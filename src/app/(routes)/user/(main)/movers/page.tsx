'use client';

import SearchInput from '@/components/common/inputSection/atoms/customInput/inputs/searchInput';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import Area from '@/components/dropdown/cta/area';
import Service from '@/components/dropdown/cta/service';
import { DropdownCta } from '@/components/dropdown/dropdown';
import area from '@/constants/dropdown/area';
import service from '@/constants/dropdown/service';
import cn from '@/utils/cn';

import { useState } from 'react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>('지역');
  const [selectedService, setSelectedService] = useState<string>('서비스');
  const [selectedSort, setSelectedSort] = useState<string>('리뷰 많은순');

  const handleSearch = () => {
    console.log('검색 버튼 클릭됨');
  };

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
              {/* <DropdownCta
                name='area'
                isOpen={isOpen}
                data={area}
                dispatch={(value) => setSelectedArea(value as string)}
                dropClassName={cn(
                  'flex overflow-auto max-h-[180px] lg:max-h-[320px]',
                )}
                listClassName={cn('w-1/2')}
              /> */}
            </div>

            <div className='flex flex-col w-full gap-4'>
              <p className='text-2lg font-semibold'>
                어떤 서비스가 필요하세요?
              </p>
              <Service
                dispatch={(value) => setSelectedService(value as string)}
              />
              {/* <DropdownCta
                name='service'
                isOpen={isOpen}
                data={service}
                // dropClassName={cn('max-h-[142px] lg:max-h-[256px]')}
              /> */}
            </div>
          </div>

          <div className='flex flex-col w-full gap-4'>
            <p className='text-xl font-semibold'>찜한 기사님</p>

            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName='김코드'
              imageUrl={null}
              movingType={['small', 'office']}
              isCustomQuote={false}
              quoteState='confirmedQuote'
              rating={4} // 별점
              experienceYears={7} // 경력
              quoteCount={777} // 견적수
              isFavorite={true} // 찜 여부 optional 찜 여부를 입력하지 않으면 검은색 하트로 표시됨
              favoriteCount={78} // 찜 개수
              ratingCount={177} // 리뷰 개수
              isFavoriteMoverList={true} // 기사님 찾기 페이지에서 찜한 기사님 목록에 사용할 경우 true
              description='최선을 다해 모시겠습니다.' // 기사님 설명 option
            />

            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName='김코드'
              imageUrl={null}
              movingType={['small', 'office']}
              isCustomQuote={false}
              quoteState='confirmedQuote'
              rating={4} // 별점
              experienceYears={7} // 경력
              quoteCount={777} // 견적수
              isFavorite={true} // 찜 여부 optional 찜 여부를 입력하지 않으면 검은색 하트로 표시됨
              favoriteCount={78} // 찜 개수
              ratingCount={177} // 리뷰 개수
              isFavoriteMoverList={true} // 기사님 찾기 페이지에서 찜한 기사님 목록에 사용할 경우 true
              description='최선을 다해 모시겠습니다.' // 기사님 설명 option
            />
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
              {/* <DropdownCta
                name='area'
                className='w-[75px] h-9'
                isOpen={isOpen}
                data={area}
                dispatch={(value) => setSelectedArea(value as string)}
                dropClassName={cn(
                  'flex overflow-y-auto max-w-[150px] max-h-[180px]',
                )}
                listClassName={cn('w-full')}
              />
              <DropdownCta
                name='service'
                className='w-[87px] h-9'
                isOpen={isOpen}
                data={service}
                dispatch={(value) => setSelectedService(value as string)}
                dropClassName={cn('max-h-[142px]')}
              /> */}
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
            <div className='flex flex-row justify-end xl:flex md:hidden hidden'>
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

            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName='김코드'
              imageUrl={null}
              movingType={['small', 'office']}
              isCustomQuote={false}
              quoteState='confirmedQuote'
              rating={4} // 별점
              experienceYears={7} // 경력
              quoteCount={777} // 견적수
              isFavorite={true} // 찜 여부 optional 찜 여부를 입력하지 않으면 검은색 하트로 표시됨
              favoriteCount={78} // 찜 개수
              ratingCount={177} // 리뷰 개수
              isFavoriteMoverList={false} // 기사님 찾기 페이지에서 찜한 기사님 목록에 사용할 경우 true
              description='최선을 다해 모시겠습니다.' // 기사님 설명 option
            />

            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName='김코드'
              imageUrl={null}
              movingType={['small', 'office']}
              isCustomQuote={false}
              quoteState='confirmedQuote'
              rating={4} // 별점
              experienceYears={7} // 경력
              quoteCount={777} // 견적수
              isFavorite={true} // 찜 여부 optional 찜 여부를 입력하지 않으면 검은색 하트로 표시됨
              favoriteCount={78} // 찜 개수
              ratingCount={177} // 리뷰 개수
              isFavoriteMoverList={false} // 기사님 찾기 페이지에서 찜한 기사님 목록에 사용할 경우 true
              description='최선을 다해 모시겠습니다.' // 기사님 설명 option
            />

            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName='김코드'
              imageUrl={null}
              movingType={['small', 'office']}
              isCustomQuote={false}
              quoteState='confirmedQuote'
              rating={4} // 별점
              experienceYears={7} // 경력
              quoteCount={777} // 견적수
              isFavorite={true} // 찜 여부 optional 찜 여부를 입력하지 않으면 검은색 하트로 표시됨
              favoriteCount={78} // 찜 개수
              ratingCount={177} // 리뷰 개수
              isFavoriteMoverList={false} // 기사님 찾기 페이지에서 찜한 기사님 목록에 사용할 경우 true
              description='최선을 다해 모시겠습니다.' // 기사님 설명 option
            />

            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName='김코드'
              imageUrl={null}
              movingType={['small', 'office']}
              isCustomQuote={false}
              quoteState='confirmedQuote'
              rating={4} // 별점
              experienceYears={7} // 경력
              quoteCount={777} // 견적수
              isFavorite={true} // 찜 여부 optional 찜 여부를 입력하지 않으면 검은색 하트로 표시됨
              favoriteCount={78} // 찜 개수
              ratingCount={177} // 리뷰 개수
              isFavoriteMoverList={false} // 기사님 찾기 페이지에서 찜한 기사님 목록에 사용할 경우 true
              description='최선을 다해 모시겠습니다.' // 기사님 설명 option
            />

            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName='김코드'
              imageUrl={null}
              movingType={['small', 'office']}
              isCustomQuote={false}
              quoteState='confirmedQuote'
              rating={4} // 별점
              experienceYears={7} // 경력
              quoteCount={777} // 견적수
              isFavorite={true} // 찜 여부 optional 찜 여부를 입력하지 않으면 검은색 하트로 표시됨
              favoriteCount={78} // 찜 개수
              ratingCount={177} // 리뷰 개수
              isFavoriteMoverList={false} // 기사님 찾기 페이지에서 찜한 기사님 목록에 사용할 경우 true
              description='최선을 다해 모시겠습니다.' // 기사님 설명 option
            />
          </div>
        </div>
      </div>
    </div>
  );
}
