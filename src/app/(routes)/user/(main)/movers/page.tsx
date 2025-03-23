'use client';

import SearchInput from '@/components/common/inputSection/atoms/customInput/inputs/searchInput';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
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
    <div className='flex flex-col px-6 md:px-[72px] w-full mx-auto'>
      <div className='flex flex-row justify-between w-full my-4 xl:hidden'>
        <div className='flex items-center gap-2'>
          <DropdownCta
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

      <div className='relative flex flex-col w-full mt-6 gap-6 flex-1'>
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
  );
}
