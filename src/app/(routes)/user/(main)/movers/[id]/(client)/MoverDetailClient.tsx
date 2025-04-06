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
import { MovingTypeKey } from '../../page';
import { MOVING_TYPES } from '@/constants/movingTypes';
import { useQuery } from '@tanstack/react-query';
import { getMoverReviewsById } from '@/services/reviewsService';
import {
  createTargetedQuoteRequest,
  checkGeneralQuoteExists,
} from '@/services/targetedQuoteRequestService';
import useUserProfile from '@/hooks/auth/useUserProfile';
import { MoverDetail } from '@/services/types/mover';

// 타입 정의
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

// 모달 컴포넌트
const LoginModal = ({
  onClose,
  onLogin,
}: {
  onClose: () => void;
  onLogin: () => void;
}) => (
  <ModalWrapper
    title='로그인이 필요합니다'
    onClose={onClose}
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
          onClick={onLogin}
        >
          로그인하기
        </CommonButton>
      </div>
    </div>
  </ModalWrapper>
);

const GeneralQuoteModal = ({
  onClose,
  onRequest,
}: {
  onClose: () => void;
  onRequest: () => void;
}) => (
  <ModalWrapper
    title='지정 견적 요청하기'
    onClose={onClose}
    className='max-w-md xl:max-w-[610px] w-full'
  >
    <div className='mt-4'>
      <p className='mt-10 mb-10'>일반 견적 요청을 먼저 진행해 주세요.</p>
      <div className='flex justify-center'>
        <CommonButton
          widthType='full'
          heightType='primary'
          backgroundColorType='blue'
          textColorType='white'
          onClick={onRequest}
        >
          일반 견적 요청하기
        </CommonButton>
      </div>
    </div>
  </ModalWrapper>
);

const SpecificQuoteModal = ({
  onClose,
  onConfirm,
  moverName,
}: {
  onClose: () => void;
  onConfirm: () => void;
  moverName: string;
}) => (
  <ModalWrapper
    title='지정 견적 요청하기'
    onClose={onClose}
    className='max-w-md xl:max-w-[610px] w-full'
  >
    <div className='mt-4'>
      <p className='mb-10'>
        {moverName} 기사님에게 지정 견적을 요청하시겠습니까?
      </p>
      <div className='flex justify-center'>
        <CommonButton
          widthType='full'
          heightType='primary'
          backgroundColorType='blue'
          textColorType='white'
          onClick={onConfirm}
        >
          지정 견적 요청하기
        </CommonButton>
      </div>
    </div>
  </ModalWrapper>
);

// 리뷰 섹션 컴포넌트
const ReviewSection = ({
  reviewsData,
  isLoadingReviews,
  currentPage,
  setCurrentPage,
}: {
  reviewsData: ReviewResponse | undefined;
  isLoadingReviews: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const totalPages = reviewsData?.totalPages ?? 1;
  const currentReviews = reviewsData?.reviews ?? [];

  return (
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
  );
};

// 서비스 정보 섹션 컴포넌트
const ServiceInfoSection = ({
  movingType,
  regions,
}: {
  movingType: MovingTypeKey[];
  regions: string[];
}) => (
  <>
    <div className='gap-0 px-6'>
      <PageHeader>제공 서비스</PageHeader>
      <div className='flex gap-3'>
        {movingType.map((type, index) => (
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
        {regions.map((region, index) => (
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
  </>
);

// 모바일 하단 버튼 컴포넌트
const MobileBottomButtons = ({
  isFavorite,
  toggleFavorite,
  isQuoteRequested,
  handleQuoteRequest,
}: {
  isFavorite: boolean;
  toggleFavorite: () => void;
  isQuoteRequested: boolean;
  handleQuoteRequest: () => void;
}) => (
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
);

interface MoverDetailClientProps {
  moverDetail: MoverDetail;
}

export default function MoverDetailClient({
  moverDetail: initialMoverDetail,
}: MoverDetailClientProps) {
  const router = useRouter();
  const params = useParams();
  const moverId = params.id as string;
  const [moverDetail, setMoverDetail] =
    useState<MoverDetail>(initialMoverDetail);
  const [isFavorite, setIsFavorite] = useState(initialMoverDetail.isFavorite);
  const [isQuoteRequested, setIsQuoteRequested] = useState<boolean>(
    initialMoverDetail.isCustomQuote,
  );
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showGeneralQuoteModal, setShowGeneralQuoteModal] =
    useState<boolean>(false);
  const [showSpecificQuoteModal, setShowSpecificQuoteModal] =
    useState<boolean>(false);

  // 리뷰
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 사용자 프로필 정보 (로그인 상태 확인용)
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile();
  const isLoggedIn = !!userProfile;

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

  // 로그인 상태가 변경될 때 상태 업데이트
  useEffect(() => {
    if (!isLoggedIn) {
      // 로그아웃 시 모든 상태 초기화
      setIsQuoteRequested(false);
      setIsFavorite(false);
      setMoverDetail((prev) => ({
        ...prev,
        isFavorite: false,
        isCustomQuote: false,
      }));
    } else {
      // 로그인 시 서버에서 받아온 초기값으로 설정 후 최신 상태 체크
      setIsQuoteRequested(initialMoverDetail.isCustomQuote);
      setIsFavorite(initialMoverDetail.isFavorite);

      const checkStatus = async () => {
        try {
          const [quoteResponse, favoriteResponse] = await Promise.all([
            checkGeneralQuoteExists(),
            axiosInstance.get(`/favorites/check/${moverId}`),
          ]);

          setIsQuoteRequested(
            quoteResponse.hasTargetedQuote || initialMoverDetail.isCustomQuote,
          );

          if (
            favoriteResponse.data &&
            favoriteResponse.data.isFavorite !== undefined
          ) {
            setIsFavorite(favoriteResponse.data.isFavorite);
            setMoverDetail((prev) => ({
              ...prev,
              isFavorite: favoriteResponse.data.isFavorite,
            }));
          }
        } catch (error) {
          console.error('상태 체크 중 오류:', error);
        }
      };

      checkStatus();
    }
  }, [isLoggedIn, initialMoverDetail, moverId]);

  // 찜하기 토글
  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      const endpoint = isFavorite
        ? `/favorites/delete/${moverId}`
        : `/favorites/create/${moverId}`;

      const response =
        await axiosInstance[isFavorite ? 'delete' : 'post'](endpoint);

      if (response.status === 200 || response.status === 201) {
        // 찜하기 상태 업데이트
        setIsFavorite((prev) => !prev);

        // 기사 정보 업데이트
        setMoverDetail((prev) => ({
          ...prev,
          favoriteCount: response.data.totalCustomerFavorite,
          isFavorite: !isFavorite,
          isFavoriteMoverList: !isFavorite,
        }));
      }
    } catch (error: any) {
      console.error('찜하기 처리 중 오류 발생:', error);
      if (error.response?.status === 401) {
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

  // 지정 견적 요청 핸들러
  const handleQuoteRequest = async (): Promise<void> => {
    console.log('지정 견적 요청 시작:', { moverId });

    if (!isLoggedIn) {
      console.log('로그인 상태 확인 실패');
      setShowLoginModal(true);
      return;
    }

    try {
      // 일반 견적 요청 여부만 확인
      const quoteResponse = await checkGeneralQuoteExists();
      console.log('일반 견적 요청 확인:', quoteResponse);

      if (!quoteResponse.isRequested) {
        console.log('일반 견적 요청 필요');
        setShowGeneralQuoteModal(true);
        return;
      }

      // 이미 지정 견적을 요청한 경우
      if (quoteResponse.hasTargetedQuote) {
        console.log('이미 지정 견적 요청됨');
        setIsQuoteRequested(true);
        return;
      }

      console.log('지정 견적 요청 모달 표시');
      setShowSpecificQuoteModal(true);
    } catch (error: any) {
      console.error('지정 견적 요청 확인 중 오류:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });

      if (error.response?.status === 401) {
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
    console.log('지정 견적 요청 확인 시작:', { moverId });

    try {
      const response = await createTargetedQuoteRequest(moverId);
      console.log('지정 견적 요청 응답:', response);

      if (response) {
        console.log('지정 견적 요청 성공');
        setIsQuoteRequested(true);
        setMoverDetail((prev) =>
          prev ? { ...prev, isCustomQuote: true } : prev,
        );
        setShowSpecificQuoteModal(false);
        alert('지정 견적 요청이 완료되었습니다.');
      }
    } catch (error: any) {
      console.error('지정 견적 요청 에러:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });

      if (error.response?.status === 401) {
        setShowLoginModal(true);
      } else if (error.response?.status === 409) {
        alert(error.response.data.error || '이미 지정 견적 요청이 존재합니다.');
        setIsQuoteRequested(true);
        setShowSpecificQuoteModal(false);
      } else if (error.response?.status === 400) {
        alert(error.response.data.error || '잘못된 요청입니다.');
      } else {
        alert('지정 견적 요청 중 오류가 발생했습니다.');
      }
    }
  };

  // 로그인 페이지로 이동
  const goToLogin = (): void => {
    router.push('/user/sign-in');
    setShowLoginModal(false);
  };

  if (reviewsError) {
    return <div>리뷰 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }

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

          <ServiceInfoSection
            movingType={moverDetail.movingType}
            regions={moverDetail.regions}
          />

          <ReviewSection
            reviewsData={reviewsData}
            isLoadingReviews={isLoadingReviews}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
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
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={goToLogin}
          />
        )}

        {/* 일반 견적 요청 필요 모달 */}
        {showGeneralQuoteModal && (
          <GeneralQuoteModal
            onClose={() => setShowGeneralQuoteModal(false)}
            onRequest={goToGeneralQuote}
          />
        )}

        {/* 지정 견적 요청 모달 */}
        {showSpecificQuoteModal && (
          <SpecificQuoteModal
            onClose={() => setShowSpecificQuoteModal(false)}
            onConfirm={confirmSpecificQuote}
            moverName={moverDetail.moverName}
          />
        )}

        {/* 모바일 하단 고정 버튼 */}
        <MobileBottomButtons
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          isQuoteRequested={isQuoteRequested}
          handleQuoteRequest={handleQuoteRequest}
        />
      </div>
    </div>
  );
}
