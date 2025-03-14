import { MouseEvent } from 'react';
import Button from '../atom/button';
import Image from 'next/image';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  containerClassName?: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  containerClassName = '',
  className = '',
}: Props) {
  const handlePrev = (e: MouseEvent) => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = (e: MouseEvent) => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageNumberClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const prevButtonClassNames = `transition-opacity duration-300 ${
    currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'text-black-500'
  } rounded-lg`;

  const nextButtonClassNames = `transition-opacity duration-300 ${
    currentPage === totalPages
      ? 'cursor-not-allowed opacity-50'
      : 'text-black-500'
  } rounded-lg`;

  const pageButtonClassNames = (page: number) => {
    return `${
      currentPage === page ? '' : 'text-grayscale-200 font-semibold'
    } rounded-lg transition-all duration-300 ${className}`;
  };

  // 페이지가 5개 이하인 경우
  const renderShortPages = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (page) => (
        <Button
          key={page}
          onClick={() => handlePageNumberClick(page)}
          className={pageButtonClassNames(page)}
        >
          {page}
        </Button>
      ),
    );
  };

  // 페이지가 6개인 경우
  const renderSixPages = () => {
    const pageNumbers = [];
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            className={pageButtonClassNames(i)}
          >
            {i}
          </Button>,
        );
      }
    } else {
      for (let i = 2; i <= 6; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            className={pageButtonClassNames(i)}
          >
            {i}
          </Button>,
        );
      }
    }
    return pageNumbers;
  };

  // 페이지가 7개 이상인 경우
  const renderLongPages = () => {
    const pageNumbers: JSX.Element[] = [];
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            className={pageButtonClassNames(i)}
          >
            {i}
          </Button>,
        );
      }
      pageNumbers.push(
        <span
          key='ellipsis-end'
          className='flex items-center justify-center w-[48px] h-[48px] text-gray-400 cursor-default'
        >
          ...
        </span>,
      );
      pageNumbers.push(
        <Button
          key={totalPages}
          onClick={() => handlePageNumberClick(totalPages)}
          className={pageButtonClassNames(totalPages)}
        >
          {totalPages}
        </Button>,
      );
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(
        <Button
          key={1}
          onClick={() => handlePageNumberClick(1)}
          className={pageButtonClassNames(1)}
        >
          1
        </Button>,
      );
      pageNumbers.push(
        <span
          key='ellipsis-start'
          className='flex items-center justify-center w-[48px] h-[48px] text-gray-400 cursor-default'
        >
          ...
        </span>,
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            className={pageButtonClassNames(i)}
          >
            {i}
          </Button>,
        );
      }
    } else {
      pageNumbers.push(
        <Button
          key={1}
          onClick={() => handlePageNumberClick(1)}
          className={pageButtonClassNames(1)}
        >
          1
        </Button>,
      );
      if (currentPage - 1 > 2) {
        pageNumbers.push(
          <span
            key='left-ellipsis'
            className='flex items-center justify-center w-[48px] h-[48px] text-gray-400 cursor-default'
          >
            ...
          </span>,
        );
      }
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageNumberClick(i)}
            className={pageButtonClassNames(i)}
          >
            {i}
          </Button>,
        );
      }
      if (totalPages - currentPage > 2) {
        pageNumbers.push(
          <span
            key='right-ellipsis'
            className='flex items-center justify-center w-[48px] h-[48px] text-gray-400 cursor-default'
          >
            ...
          </span>,
        );
      }
      pageNumbers.push(
        <Button
          key={totalPages}
          onClick={() => handlePageNumberClick(totalPages)}
          className={pageButtonClassNames(totalPages)}
        >
          {totalPages}
        </Button>,
      );
    }
    return pageNumbers;
  };

  // 페이지 번호 렌더링 함수
  const renderPageNumbers = () => {
    if (totalPages <= 5) return renderShortPages();
    if (totalPages === 6) return renderSixPages();
    return renderLongPages();
  };

  return (
    <div
      className={`flex items-center justify-center w-[476px] h-[48px] ${containerClassName}`}
    >
      <Button
        onClick={handlePrev}
        className={`${prevButtonClassNames} ${className}`}
      >
        <Image
          src='/icons/directions/chevron-left.svg'
          width={32}
          height={32}
          alt='왼쪽 화살표 이미지'
          className='w-7 xl:w-9'
        />
      </Button>
      <div className='flex items-center'>{renderPageNumbers()}</div>
      <Button
        onClick={handleNext}
        className={`${nextButtonClassNames} ${className}`}
      >
        <Image
          src='/icons/directions/chevron-right.svg'
          width={32}
          height={32}
          alt='오른쪽 화살표 이미지'
          className='w-7 xl:w-9'
        />
      </Button>
    </div>
  );
}
