'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPendingReviews } from '@/services/reviewsService';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';

export default function Page() {
  const moveTypeLabels = {
    SMALL_MOVE: 'small',
    HOME_MOVE: 'home',
    OFFICE_MOVE: 'office',
  } as const;

  type MoveType = keyof typeof moveTypeLabels;

  // ReviewableEstimate 인터페이스 정의
  interface ReviewableEstimate {
    id: string;
    driverName: string;
    driverProfileImage: string;
    serviceDate: string;
    estimatePrice: number;
    moveType: MoveType;
    isTargeted: boolean;
  }

  const [estimates, setEstimates] = useState<ReviewableEstimate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPendingReviews()
      .then((data) => {
        setEstimates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching estimates:', error);
        setError('에러가 발생했어요.\n리뷰 데이터를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, []);

  const handleReviewButtonClick = () => {
    alert('리뷰 작성하기 모달 구현중!');
  };

  // 기존 페이지네이션 관련 상태 및 계산
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const itemsPerPage: number = 6;
  // const totalPages: number = Math.ceil((estimates?.length || 0) / itemsPerPage);

  // 반응형 페이지네이션 관련 상태 및 계산
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const newItemsPerPage = window.innerWidth >= 1200 ? 6 : 4; // 1200px 이상: 6개, 이하: 4개
      setItemsPerPage(newItemsPerPage);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil((estimates?.length || 0) / itemsPerPage));
  }, [estimates, itemsPerPage]); // estimates나 itemsPerPage가 바뀔 때 totalPages 다시 계산

  // 현재 페이지의 데이터 슬라이싱
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEstimates = estimates?.slice(startIndex, endIndex) || [];

  // 페이지 변경 핸들러
  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 버튼 스타일 정의 (중복 제거)
  const getButtonStyle = (isActive: boolean) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#000' : '#ccc',
    padding: '5px 10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  });

  // 페이지가 5개 이하일 때 로직
  const renderShortPages = (): JSX.Element[] => {
    const pageNumbers: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={getButtonStyle(currentPage === i)}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  // 페이지가 6개일 때 로직
  const renderSixPages = (): JSX.Element[] => {
    const pageNumbers: JSX.Element[] = [];
    if (currentPage <= 3) {
      // 현재 페이지가 1, 2, 3일 때: "1 2 3 4 5"
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={getButtonStyle(currentPage === i)}
          >
            {i}
          </button>,
        );
      }
    } else {
      // 현재 페이지가 4, 5, 6일 때: "2 3 4 5 6"
      for (let i = 2; i <= 6; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={getButtonStyle(currentPage === i)}
          >
            {i}
          </button>,
        );
      }
    }
    return pageNumbers;
  };

  // 페이지가 7개 이상일 때 로직
  const renderLongPages = (): JSX.Element[] => {
    const pageNumbers: JSX.Element[] = [];
    if (currentPage <= 4) {
      // 현재 페이지가 1~4일 때: "1 2 3 4 5 ... N"
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={getButtonStyle(currentPage === i)}
          >
            {i}
          </button>,
        );
      }
      pageNumbers.push(
        <span
          key='ellipsis-end'
          style={{ margin: '0 5px', color: '#ccc' }}
        >
          ...
        </span>,
      );
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          style={getButtonStyle(currentPage === totalPages)}
        >
          {totalPages}
        </button>,
      );
    } else if (currentPage >= totalPages - 3) {
      // 현재 페이지가 N-4~N일 때: "1 ... N-4 N-3 N-2 N-1 N"
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          style={getButtonStyle(currentPage === 1)}
        >
          1
        </button>,
      );
      pageNumbers.push(
        <span
          key='ellipsis-start'
          style={{ margin: '0 5px', color: '#ccc' }}
        >
          ...
        </span>,
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={getButtonStyle(currentPage === i)}
          >
            {i}
          </button>,
        );
      }
    } else {
      // 현재 페이지가 중간에 있을 때: "1 ... P-1 P P+1 ... N"
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          style={getButtonStyle(currentPage === 1)}
        >
          1
        </button>,
      );
      if (currentPage - 1 > 2) {
        pageNumbers.push(
          <span
            key='left-ellipsis'
            style={{ margin: '0 5px', color: '#ccc' }}
          >
            ...
          </span>,
        );
      }
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            style={getButtonStyle(currentPage === i)}
          >
            {i}
          </button>,
        );
      }
      if (totalPages - currentPage > 2) {
        pageNumbers.push(
          <span
            key='right-ellipsis'
            style={{ margin: '0 5px', color: '#ccc' }}
          >
            ...
          </span>,
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          style={getButtonStyle(currentPage === totalPages)}
        >
          {totalPages}
        </button>,
      );
    }
    return pageNumbers;
  };

  // 페이지 번호 렌더링 함수
  // renderShortPages: 총 페이지 갯수가 5개 이하 (페이지 모두 표시)
  // renderSixPages: 총 페이지 갯수가 6개일 때 (한번에 5페이지 까지만 표시)
  // renderLongPages: 총 페이지 갯수가 7개 이상 (... 생략 기능)
  const renderPageNumbers = (): JSX.Element[] => {
    if (totalPages <= 5) return renderShortPages();
    if (totalPages === 6) return renderSixPages();
    return renderLongPages();
  };

  //로딩중
  if (loading) {
    return (
      <div>
        <div className='px-[24px] md:px-[72px] xl:px-[260px] h-[calc(100vh-54px)] xl:h-[calc(100vh-96px)] bg-gray-100 flex flex-col justify-center items-center'>
          <div className='relative w-[110px] h-[82px] xl:w-[184px] xl:h-[136px]'>
            <Image
              src='/img/logo/logo-with-icon.svg'
              alt='logo'
              fill
              // style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='pt-[24px] xl:pt-[32px] text-gray-400 text-[16px] xl:text-[24px]'>
            로딩중입니다...
          </div>
        </div>
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div>
        <div className='px-[24px] md:px-[72px] xl:px-[260px] h-[calc(100vh-54px)] xl:h-[calc(100vh-96px)] bg-gray-100 flex flex-col justify-center items-center'>
          <div className='relative w-[110px] h-[82px] xl:w-[184px] xl:h-[136px]'>
            <Image
              src='/img/logo/logo-with-icon.svg'
              alt='logo'
              fill
              // style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='pt-[24px] xl:pt-[32px] text-gray-400 text-[16px] xl:text-[24px] whitespace-pre-line text-center'>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {estimates && estimates.length > 0 ? (
        <div className='px-[24px] md:px-[72px] xl:px-[0px] xl:max-w-[1400px] xl:mx-auto'>
          <div className='grid grid-cols-1 xl:grid-cols-2 xl:gap-x-[24px] gap-y-[32px] xl:gap-y-[48px] pt-[40px] pb-[24px]'>
            {currentEstimates.map((data) => (
              <div key={data.id}>
                <MoverInfo
                  variant='review'
                  subVariant='pending'
                  moverName={data.driverName}
                  movingType={[moveTypeLabels[data.moveType]]}
                  isCustomQuote={data.isTargeted}
                  movingDate={new Date(data.serviceDate)}
                  price={data.estimatePrice}
                  onClickReviewButton={() => {
                    handleReviewButtonClick();
                  }}
                  imageUrl={data.driverProfileImage}
                />
              </div>
            ))}
          </div>
          {totalPages >= 1 && (
            <div
              style={{
                margin: '20px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '5px 10px',
                  background: 'none',
                  border: 'none',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                {'<'}
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '5px 10px',
                  background: 'none',
                  border: 'none',
                  cursor:
                    currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                {'>'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='px-[24px] md:px-[72px] xl:px-[260px] h-[calc(100vh-54px)] xl:h-[calc(100vh-96px)] bg-gray-100 flex flex-col justify-center items-center'>
          <div className='relative w-[110px] h-[82px] xl:w-[184px] xl:h-[136px]'>
            <Image
              src='/img/no-review.svg'
              alt='no-review'
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='pt-[24px] xl:pt-[32px] text-gray-400 text-[16px] xl:text-[24px]'>
            작성 가능한 리뷰가 없어요
          </div>
        </div>
      )}
    </div>
  );
}
