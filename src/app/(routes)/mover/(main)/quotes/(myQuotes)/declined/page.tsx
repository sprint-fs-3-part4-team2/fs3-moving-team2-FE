'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getRejectedQuotes } from '@/services/rejectionService';
import CustomerInfo from '@/components/common/customerInfo/templates/customerInfo';
import NoData from '@/components/noData/NoData';
import Loading from '@/app/loading';

export default function Page() {
  // 예: n개의 목데이터 생성
  // const createMockData = (count: number) => {
  //   return Array.from({ length: count }, (_, index) => ({
  //     id: `cm8drulsx00g5wam0xj25y9${index.toString().padStart(2, '0')}`, // 고유 ID 생성
  //     customerName: "유재석",
  //     serviceDate: "2025-03-24",
  //     moveType: "HOME_MOVE",
  //     isTargeted: true,
  //     fromRegion: "DAEJEON",
  //     toRegion: "ULSAN"
  //   }));
  // };

  // const mockData = createMockData(100);

  const moveTypeLabels = {
    SMALL_MOVE: 'small',
    HOME_MOVE: 'home',
    OFFICE_MOVE: 'office',
  } as const;

  type MoveType = keyof typeof moveTypeLabels;

  // RejectedQuotes 인터페이스 정의
  interface RejectedQuotes {
    id: string;
    customerName: string;
    serviceDate: string;
    moveType: MoveType;
    isTargeted: boolean;
    fromRegion: string;
    toRegion: string;
  }

  const [rejectedQuotes, setRejectedQuotes] = useState<RejectedQuotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getRejectedQuotes()
      .then((data) => {
        setRejectedQuotes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching rejectedQuotes:', error);
        const errorMessage = error.response?.data?.message || '알 수 없는 에러';
        setError(`에러가 발생했어요.\n${errorMessage}`);
        setLoading(false);
      });
  }, []);

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
    setTotalPages(Math.ceil((rejectedQuotes?.length || 0) / itemsPerPage));
  }, [rejectedQuotes, itemsPerPage]); // rejectedQuotes나 itemsPerPage가 바뀔 때 totalPages 다시 계산

  // 현재 페이지의 데이터 슬라이싱
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRejectedQuotes =
    rejectedQuotes?.slice(startIndex, endIndex) || [];

  // 페이지 변경 핸들러
  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 버튼 스타일 정의 (중복 제거)
  const getButtonStyle = (isActive: boolean) => ({
    fontWeight: isActive ? '600' : '400',
    color: isActive ? '#1F1F1F' : '#C4C4C4',
    fontSize: '18px',
    width: '48px',
    height: '48px',
    cursor: 'pointer',
  });

  /**
   * 생략 기호 정의 및 key값
   * @param {keyName} - React의 key 속성 (고유식별자)
   * <ThreeDots keyName="ellipsis-start" />
   * <ThreeDots keyName="ellipsis-end" />
   * <ThreeDots keyName="left-ellipsis" />
   * <ThreeDots keyName="right-ellipsis" />
   */
  const ThreeDots = ({
    keyName,
  }: {
    keyName:
      | 'ellipsis-start'
      | 'ellipsis-end'
      | 'left-ellipsis'
      | 'right-ellipsis';
  }) => (
    <span
      key={keyName}
      className='py-[22.5px] px-[17.5px]'
    >
      <Image
        src='/icons/pagination/three-dots.svg'
        width={13}
        height={3}
        alt='생략기호'
      />
    </span>
  );

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
      pageNumbers.push(<ThreeDots keyName='ellipsis-end' />);
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
      // 현재 페이지가 (N-4)~N일 때: "1 ... N-4 N-3 N-2 N-1 N"
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          style={getButtonStyle(currentPage === 1)}
        >
          1
        </button>,
      );
      pageNumbers.push(<ThreeDots keyName='ellipsis-start' />);
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
        pageNumbers.push(<ThreeDots keyName='left-ellipsis' />);
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
        pageNumbers.push(<ThreeDots keyName='right-ellipsis' />);
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

  /** 페이지 번호 렌더링 함수
   * renderShortPages: 총 페이지 갯수가 5개 이하 (페이지 모두 표시)
   * renderSixPages: 총 페이지 갯수가 6개일 때 (한번에 5페이지 까지만 표시)
   * renderLongPages: 총 페이지 갯수가 7개 이상 (... 생략 기능)
   */
  const renderPageNumbers = (): JSX.Element[] => {
    if (totalPages <= 5) return renderShortPages();
    if (totalPages === 6) return renderSixPages();
    return renderLongPages();
  };

  //로딩중
  if (loading) {
    return (
      <div>
        <div className='px-[24px] md:px-[72px] xl:px-[260px] h-[calc(100vh-(54px+54px+2px))] md:h-[calc(100vh-(54px+54px+2px))] xl:h-[calc(100vh-(84px+84px+6px))] flex flex-col justify-center items-center bg-backgroundVariants-50'>
          <Loading />
          {/* <div className='relative w-[210.6px] h-[84px] xl:w-[351px] xl:h-[140px]'>
            <Image
              src='/img/car.svg'
              alt='logo'
              fill
              // style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='pt-[24px] xl:pt-[32px] text-gray-400 text-[16px] xl:text-[24px]'>
            로딩중입니다...
          </div> */}
        </div>
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div>
        <div className='px-[24px] md:px-[72px] xl:px-[260px] h-[calc(100vh-(54px+54px+2px))] md:h-[calc(100vh-(54px+54px+2px))] xl:h-[calc(100vh-(84px+84px+6px))] flex flex-col justify-center items-center bg-backgroundVariants-50'>
          <div className='relative w-[110px] h-[82px] xl:w-[184px] xl:h-[136px]'>
            <Image
              src='/img/no-review.svg'
              alt='no-review'
              fill
              style={{ objectFit: 'cover' }}
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
      {rejectedQuotes && rejectedQuotes.length > 0 ? (
        <div className='px-[24px] md:px-[72px] xl:px-[0px] xl:max-w-[1400px] xl:mx-auto'>
          <div className='grid grid-cols-1 xl:grid-cols-2 xl:gap-x-[24px] gap-y-[32px] xl:gap-y-[48px] pt-[40px] pb-[24px]'>
            {currentRejectedQuotes.map((data) => (
              <div
                key={data.id}
                className='bg-white'
              >
                <CustomerInfo
                  variant='submitted'
                  quoteId={data.id}
                  movingType={[moveTypeLabels[data.moveType]]}
                  isCustomQuote={data.isTargeted}
                  customerName={data.customerName}
                  movingDate={new Date(data.serviceDate)}
                  departure={data.fromRegion}
                  arrival={data.toRegion}
                  completed={false}
                  declined={true}
                />
              </div>
            ))}
          </div>
          {totalPages >= 1 && (
            <div className='my-[30px] flex justify-center items-center gap-[4px]'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='p-[12px] rounded-[8px] text-center border-none mr-[6px]'
              >
                <Image
                  src={`/icons/pagination/chevron-left-${currentPage === 1 ? 'gray' : 'black'}.svg`}
                  width={24}
                  height={24}
                  alt='왼쪽 화살표'
                />
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='p-[12px] rounded-[8px] text-center border-none ml-[6px]'
              >
                <Image
                  src={`/icons/pagination/chevron-right-${currentPage === totalPages ? 'gray' : 'black'}.svg`}
                  width={24}
                  height={24}
                  alt='오른쪽 화살표'
                />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='px-[24px] md:px-[72px] xl:px-[260px] h-[calc(100vh-(54px+54px+2px))] md:h-[calc(100vh-(54px+54px+2px))] xl:h-[calc(100vh-(84px+84px+6px))] flex flex-col justify-center items-center bg-backgroundVariants-50'>
          <NoData text='반려한 견적이 없어요' />
        </div>
      )}
    </div>
  );
}
