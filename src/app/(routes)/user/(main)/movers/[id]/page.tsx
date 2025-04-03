'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import RatingStat from '@/components/common/ratingStat/templates/ratingStat';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import ShareButtons from '@/components/common/ShareButtons';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ServiceBadge from '@/components/common/shared/atoms/serviceBadge';
import ModalWrapper from '@/components/modal/ModalWrapper';
import Pagination from '@/components/pagination/molecule/pagination';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import filledHeart from '@/public/icons/favorite/filled.svg';
import redFilledHeart from '@/public/icons/favorite/red-filled.svg';
import Image from 'next/image';
import { MovingTypeKey } from '../page';
import { MOVING_TYPES } from '@/constants/movingTypes';
import { useQuery } from '@tanstack/react-query';
import { getMoverReviewsById } from '@/services/reviewsService';

type MoverDetail = {
  id: string;
  moverName: string;
  imageUrl: string;
  movingType: MovingTypeKey[];
  isCustomQuote: boolean;
  rating: number;
  ratingCount: number;
  experienceYears: number;
  quoteCount: number;
  isFavorite: boolean;
  isFavoriteMoverList: boolean;
  favoriteCount: number;
  introduction: string;
  description: string;
  regions: string[];
};

type Review = {
  id: string;
  name: string;
  writtenAt: string;
  rating: number;
  ratingCount: number;
  content: string;
  introduction: string;
  regions: string[];
};

type RatingCounts = {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
};

type ReviewResponse = {
  reviews: Review[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  averageRating: number;
  ratingCount: number;
  ratingCounts: RatingCounts;
};

const ITEMS_PER_PAGE = 5;

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
  const [isLoading, setIsLoading] = useState(true);

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

  // 로그인 상태 확인용 (테스트용)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 일반 견적 요청 상태 (테스트용)
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
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await axiosInstance.get(`/favorites/check/${moverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.isFavorite !== undefined) {
        setIsFavorite(response.data.isFavorite);
        setMoverDetail((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            isFavorite: response.data.isFavorite,
          };
        });
      }
    } catch (error) {
      console.error('찜하기 상태 확인 중 오류:', error);
    }
  };

  // 찜하기 토글
  const toggleFavorite = async () => {
    if (!checkLoginStatus()) return;

    try {
      const token = localStorage.getItem('accessToken');
      const endpoint = isFavorite
        ? `/favorites/delete/${moverId}`
        : `/favorites/create/${moverId}`;

      const response = await axiosInstance[isFavorite ? 'delete' : 'post'](
        endpoint,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        // 찜하기 상태 업데이트
        setIsFavorite((prev) => !prev);

        // 기사 정보 업데이트
        setMoverDetail((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            favoriteCount: response.data.totalCustomerFavorite,
            isFavorite: !isFavorite,
            isFavoriteMoverList: !isFavorite,
          };
        });
      }
    } catch (error: any) {
      console.error('찜하기 처리 중 오류 발생:', error);
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        setShowLoginModal(true);
      } else if (error.response?.status === 400) {
        console.error(error.response.data.error || '잘못된 요청입니다.');
      } else {
        console.error('찜하기 처리 중 오류가 발생했습니다.');
      }
      // 에러 발생 시 이전 상태로 되돌림
      setIsFavorite((prev) => prev);
    }
  };

  useEffect(() => {
    const fetchMoverDetail = async () => {
      try {
        const response = await axiosInstance.get(`/movers/${moverId}`);
        const data = response.data.data;
        setMoverDetail(data);
        setIsFavorite(data.isFavorite);
        setIsQuoteRequested(data.isCustomQuote);
        setIsLoading(false);
      } catch (error) {
        console.error('기사 상세 정보 조회 에러:', error);
        setIsLoading(false);
      }
    };

    if (moverId) {
      fetchMoverDetail();
    }
  }, [moverId]);

  // 일반 견적 요청 여부 확인
  const checkGeneralQuote = async () => {
    try {
      console.log('일반 견적 요청 확인 시작');
      const token = localStorage.getItem('accessToken');
      console.log('현재 토큰:', token);

      if (!token) {
        console.log('토큰이 없습니다.');
        setIsLoggedIn(false);
        return;
      }

      const response = await axiosInstance.get('/quote-requests/latest', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('일반 견적 요청 응답:', response.data);

      if (response.data && Array.isArray(response.data)) {
        setHasGeneralQuote(response.data.length > 0);
        console.log('일반 견적 요청 여부:', response.data.length > 0);
      } else {
        console.log('응답 데이터 형식이 올바르지 않습니다:', response.data);
        setHasGeneralQuote(false);
      }
    } catch (error: any) {
      console.error('일반 견적 요청 조회 에러:', error);
      if (error.response?.status === 401) {
        console.log('인증 에러 발생, 로그인 상태 초기화');
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
      }
      setHasGeneralQuote(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('초기 토큰 확인:', token);

    if (token) {
      setIsLoggedIn(true);
      checkGeneralQuote();
    } else {
      setIsLoggedIn(false);
      console.log('토큰이 없어 로그인 상태가 아닙니다.');
    }
  }, []);

  // 지정 견적 요청 핸들러
  const handleQuoteRequest = async (): Promise<void> => {
    if (!checkLoginStatus()) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.get(
        `/quote-requests/check/${moverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 이미 지정 견적을 요청한 경우
      if (response.data.isRequested) {
        setIsQuoteRequested(true);
        return;
      }

      // 일반 견적 요청 여부 확인
      if (!hasGeneralQuote) {
        setShowGeneralQuoteModal(true);
        return;
      }

      setShowSpecificQuoteModal(true);
    } catch (error: any) {
      console.error('지정 견적 요청 확인 중 오류:', error);
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        setShowLoginModal(true);
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
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.post(
        `/quote-requests/specific/${moverId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setIsQuoteRequested(true);
        setShowSpecificQuoteModal(false);
        alert('지정 견적 요청이 완료되었습니다.');
      }
    } catch (error: any) {
      console.error('지정 견적 요청 에러:', error);
      if (error.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        setShowLoginModal(true);
      }
    }
  };

  // 로그인 페이지로 이동
  const goToLogin = (): void => {
    router.push('/user/auth/sign-in');
    setShowLoginModal(false);
  };

  // 페이지 로드 시 초기 상태 체크
  useEffect(() => {
    const initializePage = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
        await Promise.all([checkGeneralQuote(), checkFavoriteStatus()]);
      } else {
        setIsLoggedIn(false);
      }
    };

    initializePage();
  }, [moverId]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!moverDetail) {
    return <div>기사를 찾을 수 없습니다.</div>;
  }

  if (reviewsError) {
    return <div>리뷰 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }

  const totalPages = reviewsData?.totalPages ?? 1;
  const currentReviews = reviewsData?.reviews ?? [];

  // 찜하기 버튼 렌더링 부분 수정
  const renderFavoriteButton = () => (
    <CommonButton
      widthType='full'
      heightType='primary'
      backgroundColorType='white'
      textColorType='black'
      borderColorsType='gray'
      className='flex items-center justify-center gap-2'
      onClick={toggleFavorite}
    >
      <Image
        src={isFavorite ? redFilledHeart : filledHeart}
        alt='찜하기'
        width={24}
        height={24}
      />
      기사님 찜하기
    </CommonButton>
  );

  return (
    <div className='relative flex flex-col items-center mx-auto w-full overflow-auto xl:mt-[56px] mt-6 pb-24'>
      <div className='flex w-full px-0 md:px-[72px] xl:px-[100px] max-w-[1600px] gap-[117px]'>
        <div className='flex flex-col gap-10 w-full flex-1'>
          <MoverInfo
            variant='quote'
            subVariant='completed'
            moverName={moverDetail.moverName}
            imageUrl={moverDetail.imageUrl}
            movingType={moverDetail.movingType}
            isCustomQuote={moverDetail.isCustomQuote}
            rating={moverDetail.rating}
            experienceYears={moverDetail.experienceYears}
            quoteCount={moverDetail.quoteCount}
            favoriteCount={moverDetail.favoriteCount}
            ratingCount={moverDetail.ratingCount}
            isFavorite={moverDetail.isFavorite}
            isFavoriteMoverList={false}
            description={moverDetail.description}
          />
          {/* 모바일 */}
          <div className='flex-col gap-10 pl-6 flex md:flex xl:hidden'>
            <ShareButtons text='나만 알기엔 아쉬운 기사님인가요?' />
          </div>
          <HorizontalDivider />

          <div className='gap-0 px-6'>
            <PageHeader>상세설명</PageHeader>
            <p className='text-2lg text-[18px] font-regular'>
              {moverDetail.introduction}
            </p>
          </div>
          <HorizontalDivider />

          <div className='gap-0 px-6'>
            <PageHeader>제공 서비스</PageHeader>
            <div className='flex gap-3'>
              {moverDetail.movingType.map((type, index) => (
                <ServiceBadge
                  key={index}
                  color='blue'
                >
                  {MOVING_TYPES[type].value}
                </ServiceBadge>
              ))}
            </div>
          </div>
          <HorizontalDivider />

          <div className='gap-0 px-6'>
            <PageHeader>서비스 가능 지역</PageHeader>
            <div className='flex gap-3'>
              {moverDetail.regions.map((region, index) => (
                <ServiceBadge
                  key={index}
                  color='gray'
                >
                  {region}
                </ServiceBadge>
              ))}
            </div>
          </div>
          <HorizontalDivider />

          <div className='px-6'>
            <RatingStat
              ratingCounts={
                reviewsData?.ratingCounts ?? {
                  1: 0,
                  2: 0,
                  3: 0,
                  4: 0,
                  5: 0,
                }
              }
              averageRating={reviewsData?.averageRating ?? 0}
              totalCount={reviewsData?.ratingCount ?? 0}
            />

            {/* 리뷰 리스트 */}
            {isLoadingReviews ? (
              <div>리뷰 로딩 중...</div>
            ) : (
              <>
                {currentReviews.map((review: Review) => (
                  <ReviewBlock
                    key={review.id}
                    name={review.name}
                    writtenAt={review.writtenAt}
                    rating={review.rating}
                    content={review.content}
                  />
                ))}

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className='flex justify-center mt-[40px] mb-[59px]'>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 데스크탑 */}
        <div className='w-[354px] gap-[40px] hidden md:hidden xl:flex flex-col'>
          <p className='text-xl font-semibold'>
            {moverDetail.moverName} 기사님에게 지정 견적을 요청해보세요!
          </p>

          {renderFavoriteButton()}

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

          <HorizontalDivider />
          <ShareButtons text='견적서 공유하기' />
        </div>

        {/* 모달 */}
        {/* 로그인 모달 */}
        {showLoginModal && (
          <ModalWrapper
            title='로그인이 필요합니다'
            onClose={() => setShowLoginModal(false)}
            className='max-w-md xl:max-w-[610px] w-full'
          >
            <div className='mt-4'>
              <p className='mt-10 mb-10'>
                이 기능을 사용하기 위해서는 로그인이 필요합니다.
              </p>
              <div className='flex gap-3 justify-end'>
                <CommonButton
                  widthType='full'
                  heightType='primary'
                  backgroundColorType='blue'
                  textColorType='white'
                  onClick={goToLogin}
                >
                  로그인하기
                </CommonButton>
              </div>
            </div>
          </ModalWrapper>
        )}

        {/* 일반 견적 요청 필요 모달 */}
        {showGeneralQuoteModal && (
          <ModalWrapper
            title='지정 견적 요청하기'
            onClose={() => setShowGeneralQuoteModal(false)}
            className='max-w-md xl:max-w-[610px] w-full'
          >
            <div className='mt-4'>
              <p className='mt-10 mb-10'>
                일반 견적 요청을 먼저 진행해 주세요.
              </p>
              <div className='flex justify-center'>
                <CommonButton
                  widthType='full'
                  heightType='primary'
                  backgroundColorType='blue'
                  textColorType='white'
                  onClick={goToGeneralQuote}
                >
                  일반 견적 요청하기
                </CommonButton>
              </div>
            </div>
          </ModalWrapper>
        )}

        {/* 지정 견적 요청 모달 */}
        {showSpecificQuoteModal && (
          <ModalWrapper
            title='지정 견적 요청하기'
            onClose={() => setShowSpecificQuoteModal(false)}
            className='max-w-md xl:max-w-[610px] w-full'
          >
            <div className='mt-4'>
              <p className='mb-10'>
                김코드 기사님에게 지정 견적을 요청하시겠습니까?
              </p>
              <div className='flex justify-center'>
                <CommonButton
                  widthType='full'
                  heightType='primary'
                  backgroundColorType='blue'
                  textColorType='white'
                  onClick={confirmSpecificQuote}
                >
                  지정 견적 요청하기
                </CommonButton>
              </div>
            </div>
          </ModalWrapper>
        )}

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
              onClick={toggleFavorite}
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
