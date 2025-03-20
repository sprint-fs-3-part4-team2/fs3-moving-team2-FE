'use client';
import { useState } from 'react';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import { MockDataList } from './mockData';
import Pagination from '@/components/pagination/molecule/pagination';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(MockDataList.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = MockDataList.slice(startIndex, endIndex);

  return (
    <div className='flex flex-col items-center mx-auto'>
      <div className='max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 xl:gap-x-[24px] gap-y-[32px] xl:gap-y-[48px] pt-[40px] pb-[24px]'>
        {currentData.map((data) => (
          <div
            key={data.driverName}
            className='bg-white'
          >
            <MoverInfo
              variant='review'
              subVariant='written'
              moverName={data.driverName}
              movingType={data.movingType}
              isCustomQuote={data.isCustomQuote}
              quoteState={data.quoteState}
              movingDate={data.movingDate}
              price={data.price}
              reviewContent={data.reviewContent}
              rating={data.rating}
              writtenAt={data.writtenAt}
              imageUrl={''}
            />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className='mx-auto'
        />
      )}
    </div>
  );
}
