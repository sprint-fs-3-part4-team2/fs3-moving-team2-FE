'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPendingReviews, submitReview } from '@/services/reviewsService';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import ReviewModal from '@/components/reviewModal/ReviewModal';
import Loading from '@/app/loading';
import NoData from '@/components/noData/NoData';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function ConfirmationModal({
  message,
  showCancel,
  onConfirm,
  onCancel,
  onClose,
}: {
  message: string;
  showCancel: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-[#141414] bg-opacity-60 backdrop-blur-[5px] z-[150]'
      onClick={onClose}
    >
      <dialog
        className='w-[350px] md:w-[500px] h-[230px] md:h-[300px] px-[24px] pt-[24px] md:pt-[34px] pb-[24px] md:pb-[40px] bg-white rounded-[32px] fixed top-1/2 transform -translate-y-1/2 border-[2px] border-gray-200 z-[200]'
        open
        onClick={(e: React.MouseEvent<HTMLDialogElement>) =>
          e.stopPropagation()
        }
      >
        <p className='text-[20px] md:text-[24px]/[32px] font-[600]'>
          리뷰 작성 완료
        </p>
        <p className='absolute w-full px-[24px] text-center break-keep top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[26px] md:-translate-y-[84px] text-[16px] md:text-[21px] font-[500] md:py-[50px]'>
          {message}
        </p>
        <div className='absolute bottom-[24px] md:bottom-[28px] w-[calc(350px-48px)] md:w-[calc(500px-48px)] flex justify-center gap-[10px] md:gap-[16px]'>
          {showCancel && (
            <button
              onClick={onCancel}
              className='text-[16px] md:text-[20px] font-[600] text-primary-blue-300 w-[100%] h-[54px] md:h-[64px] text-center rounded-[16px] border-[1px] border-primary-blue-300 cursor-pointer'
            >
              취소
            </button>
          )}
          <button
            onClick={onConfirm}
            className='text-base md:text-[20px] font-[600] bg-primary-blue-300 text-white w-[100%] h-[54px] md:h-[64px] text-center rounded-[16px] border-[1px] border-primary-blue-300 cursor-pointer'
          >
            확인
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const moveTypeLabels = {
    SMALL_MOVE: 'small',
    HOME_MOVE: 'home',
    OFFICE_MOVE: 'office',
  } as const;

  type MoveType = keyof typeof moveTypeLabels;

  interface ReviewableEstimate {
    id: string;
    driverName: string;
    driverProfileImage: string;
    serviceDate: string;
    estimatePrice: number;
    moveType: MoveType;
    isTargeted: boolean;
  }

  interface CompletedReview {
    writtenAt: string;
    id: string;
    moverName: string;
    imageUrl: string;
    movingDate: string;
    movingType: string[];
    price: number;
    rating: number;
    reviewContent: string;
    isCustomQuote: boolean;
  }

  const {
    data: estimates,
    isLoading,
    error,
  } = useQuery<ReviewableEstimate[], Error>({
    queryKey: ['pendingReviews'],
    queryFn: getPendingReviews,
    staleTime: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEstimate, setSelectedEstimate] =
    useState<ReviewableEstimate | null>(null);
  const [postSubmitModal, setPostSubmitModal] = useState({
    isOpen: false,
    message: '',
    showCancel: false,
  });

  const reviewMutation = useMutation({
    mutationFn: (reviewData: {
      estimateId: string;
      rating: number;
      comment: string;
    }) => submitReview(reviewData),
    onSuccess: (response, variables) => {
      const moverId = response.data.moverId;
      queryClient.setQueryData(
        ['pendingReviews'],
        (oldData: ReviewableEstimate[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter(
            (estimate) => estimate.id !== variables.estimateId,
          );
        },
      );

      queryClient.setQueryData<CompletedReview[]>(
        ['completedReviews'],
        (oldCompleted) => {
          const estimate = estimates?.find(
            (e) => e.id === variables.estimateId,
          );
          const newReview = {
            writtenAt: new Date().toISOString().split('T')[0],
            id: moverId,
            moverName: estimate?.driverName || 'Unknown',
            imageUrl:
              estimate?.driverProfileImage ||
              '/img/sample-profile/sample-1.svg',
            movingDate: estimate?.serviceDate || 'Unknown',
            movingType: [moveTypeLabels[estimate?.moveType || 'HOME_MOVE']],
            price: estimate?.estimatePrice || 0,
            rating: variables.rating,
            reviewContent: variables.comment,
            isCustomQuote: estimate?.isTargeted || false,
          };
          return oldCompleted ? [...oldCompleted, newReview] : [newReview];
        },
      );

      const remainingEstimates = (estimates || []).filter(
        (estimate) => estimate.id !== variables.estimateId,
      );
      if (remainingEstimates.length > 0) {
        setPostSubmitModal({
          isOpen: true,
          message: '내가 작성한 리뷰 페이지로 이동하시겠습니까?',
          showCancel: true,
        });
      } else {
        setPostSubmitModal({
          isOpen: true,
          message: '내가 작성한 리뷰 페이지로 이동합니다.',
          showCancel: false,
        });
      }
    },
    onError: (error: Error) => {
      alert(`리뷰 제출에 실패했습니다: ${error.message || '알 수 없는 에러'}`);
    },
  });

  const handleReviewButtonClick = (estimate: ReviewableEstimate) => {
    setSelectedEstimate(estimate);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = (
    estimateId: string,
    rating: number,
    comment: string,
  ) => {
    reviewMutation.mutate({ estimateId, rating, comment });
  };

  const handleConfirm = () => {
    setPostSubmitModal({ ...postSubmitModal, isOpen: false });
    router.push('/user/reviews/completed');
  };

  const handleCancel = () => {
    setPostSubmitModal({ ...postSubmitModal, isOpen: false });
  };

  const handleModalClose = () => {
    if (!postSubmitModal.showCancel) {
      handleConfirm();
    } else {
      handleCancel();
    }
  };

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
  if (isLoading) {
    return <Loading />;
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
            {`에러가 발생했어요.\n${error.message || '알 수 없는 에러'}`}
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
            {currentEstimates.map((data: ReviewableEstimate) => (
              <div
                key={data.id}
                className='bg-white'
              >
                <MoverInfo
                  variant='review'
                  subVariant='pending'
                  moverName={data.driverName}
                  movingType={[moveTypeLabels[data.moveType as MoveType]]}
                  isCustomQuote={data.isTargeted}
                  movingDate={new Date(data.serviceDate)}
                  price={data.estimatePrice}
                  onClickReviewButton={() => handleReviewButtonClick(data)}
                  imageUrl={data.driverProfileImage}
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
          <NoData text='작성 가능한 리뷰가 없어요' />
        </div>
      )}
      {/* 모달 렌더링 */}
      {isModalOpen && selectedEstimate && (
        <ReviewModal
          estimate={selectedEstimate}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReviewSubmit} // 제출 후 콜백 전달
        />
      )}
      {postSubmitModal.isOpen && (
        <ConfirmationModal
          message={postSubmitModal.message}
          showCancel={postSubmitModal.showCancel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
