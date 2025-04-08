'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import filledHeart from '@/public/icons/favorite/filled.svg';
import redFilledHeart from '@/public/icons/favorite/red-filled.svg';

import {
  getMoverDetail,
  checkFavoriteStatus as checkFavoriteStatusService,
  toggleFavorite,
  checkGeneralQuote,
  MoverDetail as MoverDetailType,
} from '@/services/moverService';
import { getMoverReviewsById } from '@/services/reviewsService';
import {
  createTargetedQuoteRequest,
  checkGeneralQuoteExists,
} from '@/services/targetedQuoteRequestService';

import MoverDetailHeader from '@/components/moverDetail/MoverDetailHeader';
import MoverDetailContent from '@/components/moverDetail/MoverDetailContent';
import MoverDetailReviews from '@/components/moverDetail/MoverDetailReviews';
import MoverDetailSidebar from '@/components/moverDetail/MoverDetailSidebar';
import MoverDetailModals from '@/components/moverDetail/MoverDetailModals';

type MoverDetail = MoverDetailType;

// 에러 상태 타입 정의
type ErrorState = {
  code: string;
  message: string;
} | null;

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const moverId = params.id as string;
  const [moverDetail, setMoverDetail] = useState<MoverDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isQuoteRequested, setIsQuoteRequested] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showGeneralQuoteModal, setShowGeneralQuoteModal] =
    useState<boolean>(false);
  const [showSpecificQuoteModal, setShowSpecificQuoteModal] =
    useState<boolean>(false);
  const [error, setError] = useState<ErrorState>(null);

  // 리뷰
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 리뷰 목록 조회
  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useQuery({
    queryKey: ['moverReviews', moverId, currentPage],
    queryFn: async () => {
      const response = await getMoverReviewsById(
        moverId,
        currentPage,
        itemsPerPage,
      );
      return response.data;
    },
  });

  // 로그인 상태 확인용
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 일반 견적 요청 상태
  const [hasGeneralQuote, setHasGeneralQuote] = useState<boolean>(false);

  // 로그인 상태 체크
  const checkLoginStatus = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoggedIn(false);
      setShowLoginModal(true);
      return false;
    }
    setIsLoggedIn(true);
    return true;
  };

  // 찜하기 상태 체크
  const checkFavoriteStatus = async () => {
    try {
      const response = await checkFavoriteStatusService(moverId);
      if (response && response.isFavorite !== undefined) {
        setIsFavorite(response.isFavorite);
        setMoverDetail((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            isFavorite: response.isFavorite,
          };
        });
      }
    } catch (error: any) {
      setError({
        code: 'FAVORITE_CHECK_ERROR',
        message: '찜하기 상태 확인 중 오류가 발생했습니다.',
      });
    }
  };

  // 찜하기 토글
  const handleToggleFavorite = async () => {
    if (!checkLoginStatus()) return;

    try {
      const response = await toggleFavorite(moverId, isFavorite);

      if (response) {
        // 찜하기 상태 업데이트
        setIsFavorite((prev) => !prev);

        // 기사 정보 업데이트
        setMoverDetail((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            favoriteCount: response.totalCustomerFavorite,
            isFavorite: !isFavorite,
            isFavoriteMoverList: !isFavorite,
          };
        });
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        setShowLoginModal(true);
        setError({
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        });
      } else if (error.response?.status === 400) {
        setError({
          code: 'BAD_REQUEST',
          message: error.response.data.error || '잘못된 요청입니다.',
        });
      } else {
        setError({
          code: 'FAVORITE_TOGGLE_ERROR',
          message: '찜하기 처리 중 오류가 발생했습니다.',
        });
      }
      // 에러 발생 시 이전 상태로 되돌림
      setIsFavorite((prev) => prev);
    }
  };

  useEffect(() => {
    const fetchMoverDetail = async () => {
      try {
        const data = await getMoverDetail(moverId);
        setMoverDetail(data);
        setIsFavorite(data.isFavorite);
        setIsQuoteRequested(data.isCustomQuote);
      } catch (error: any) {
        setError({
          code: 'MOVER_DETAIL_ERROR',
          message: '기사 상세 정보 조회 중 오류가 발생했습니다.',
        });
      }
    };

    if (moverId) {
      fetchMoverDetail();
    }
  }, [moverId]);

  // 일반 견적 요청 여부 확인
  const checkGeneralQuoteStatus = async () => {
    try {
      const response = await checkGeneralQuote();

      if (response && response.isRequested !== undefined) {
        setHasGeneralQuote(response.isRequested);
      } else {
        setHasGeneralQuote(false);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        setError({
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        });
      } else {
        setError({
          code: 'GENERAL_QUOTE_CHECK_ERROR',
          message: '일반 견적 요청 상태 확인 중 오류가 발생했습니다.',
        });
      }
      setHasGeneralQuote(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      setIsLoggedIn(true);
      checkGeneralQuoteStatus();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 지정 견적 요청 핸들러
  const handleQuoteRequest = async (): Promise<void> => {
    if (!checkLoginStatus()) return;

    try {
      // 일반 견적 요청 여부만 확인
      const quoteResponse = await checkGeneralQuoteExists();

      if (!quoteResponse.isRequested) {
        setShowGeneralQuoteModal(true);
        return;
      }

      // 이미 지정 견적을 요청한 경우
      if (quoteResponse.hasTargetedQuote) {
        setIsQuoteRequested(true);
        return;
      }

      setShowSpecificQuoteModal(true);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        setShowLoginModal(true);
        setError({
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        });
      } else {
        setError({
          code: 'QUOTE_REQUEST_CHECK_ERROR',
          message: '견적 요청 확인 중 오류가 발생했습니다.',
        });
      }
    }
  };

  // 일반 견적 요청 페이지로 이동
  const goToGeneralQuote = (): void => {
    router.push('/user/quotes/request');
    setShowGeneralQuoteModal(false);
  };

  // 지정 견적 요청 확인
  const confirmSpecificQuote = async (): Promise<void> => {
    try {
      const response = await createTargetedQuoteRequest(moverId);

      if (response) {
        setIsQuoteRequested(true);
        setMoverDetail((prev) =>
          prev ? { ...prev, isCustomQuote: true } : null,
        );
        setShowSpecificQuoteModal(false);
        alert('지정 견적 요청이 완료되었습니다.');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        setShowLoginModal(true);
        setError({
          code: 'UNAUTHORIZED',
          message: '로그인이 필요합니다.',
        });
      } else if (error.response?.status === 409) {
        setError({
          code: 'QUOTE_ALREADY_EXISTS',
          message:
            error.response.data.error || '이미 지정 견적 요청이 존재합니다.',
        });
        setIsQuoteRequested(true);
        setShowSpecificQuoteModal(false);
      } else if (error.response?.status === 400) {
        setError({
          code: 'BAD_REQUEST',
          message: error.response.data.error || '잘못된 요청입니다.',
        });
      } else {
        setError({
          code: 'QUOTE_REQUEST_ERROR',
          message: '지정 견적 요청 중 오류가 발생했습니다.',
        });
      }
    }
  };

  // 로그인 페이지로 이동
  const goToLogin = (): void => {
    router.push('/user/sign-in');
    setShowLoginModal(false);
  };

  // 페이지 로드 시 초기 상태 체크
  useEffect(() => {
    const initializePage = async () => {
      const token = document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('accessToken='));
      if (token) {
        setIsLoggedIn(true);
        await Promise.all([checkGeneralQuoteStatus(), checkFavoriteStatus()]);
      } else {
        setIsLoggedIn(false);
      }
    };

    initializePage();
  }, [moverId]);

  // 에러 처리 함수
  const handleError = () => {
    if (error) {
      // 에러 코드에 따른 처리
      switch (error.code) {
        case 'UNAUTHORIZED':
          setShowLoginModal(true);
          break;
        case 'QUOTE_ALREADY_EXISTS':
          alert(error.message);
          break;
        default:
          alert(error.message);
      }
      // 에러 상태 초기화
      setError(null);
    }
  };

  // 에러 상태 변경 시 처리
  useEffect(() => {
    if (error) {
      handleError();
    }
  }, [error]);

  if (!moverDetail) {
    return <div>기사를 찾을 수 없습니다.</div>;
  }

  if (reviewsError) {
    return <div>리뷰 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className='relative flex flex-col items-center mx-auto w-full overflow-auto xl:mt-[56px] mt-6 pb-24'>
      <div className='flex w-full px-0 md:px-[72px] xl:px-[100px] max-w-[1600px] gap-[117px]'>
        <div className='flex flex-col gap-10 w-full flex-1'>
          <MoverDetailHeader moverDetail={moverDetail} />
          <MoverDetailContent moverDetail={moverDetail} />
          <MoverDetailReviews
            reviewsData={reviewsData}
            isLoadingReviews={isLoadingReviews}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <MoverDetailSidebar
          moverName={moverDetail.moverName}
          isFavorite={isFavorite}
          isQuoteRequested={isQuoteRequested}
          onToggleFavorite={handleToggleFavorite}
          onQuoteRequest={handleQuoteRequest}
        />

        <MoverDetailModals
          showLoginModal={showLoginModal}
          showGeneralQuoteModal={showGeneralQuoteModal}
          showSpecificQuoteModal={showSpecificQuoteModal}
          moverName={moverDetail.moverName}
          onCloseLoginModal={() => setShowLoginModal(false)}
          onCloseGeneralQuoteModal={() => setShowGeneralQuoteModal(false)}
          onCloseSpecificQuoteModal={() => setShowSpecificQuoteModal(false)}
          onLogin={goToLogin}
          onGeneralQuote={goToGeneralQuote}
          onSpecificQuote={confirmSpecificQuote}
        />

        {/* 모바일 하단 고정 버튼 */}
        <div className='fixed md:fixed xl:hidden bottom-0 left-0 right-0 w-full px-[72px] max-w-[1400px] mx-auto py-[10px] border-t border-t-gray-50 bg-white'>
          <div className='flex gap-2'>
            <CommonButton
              widthType='dynamic'
              heightType='primary'
              backgroundColorType='white'
              textColorType='black'
              borderColorsType='gray'
              className='flex items-center justify-center p-[15px]'
              onClick={handleToggleFavorite}
            >
              <Image
                src={isFavorite ? redFilledHeart : filledHeart}
                alt='찜하기'
                width={28}
                height={28}
              />
            </CommonButton>
            <CommonButton
              widthType='full'
              heightType='primary'
              backgroundColorType={isQuoteRequested ? 'gray' : 'blue'}
              textColorType='white'
              onClick={handleQuoteRequest}
              disabled={isQuoteRequested}
            >
              {isQuoteRequested ? '지정 견적 요청 완료' : '지정 견적 요청하기'}
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
