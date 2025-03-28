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
import filledHeart from '@/public/icons/favorite/filled.svg';
import redFilledHeart from '@/public/icons/favorite/red-filled.svg';
import Image from 'next/image';

type Review = {
  id: number;
  name: string;
  writtenAt: string;
  rating: number;
  content: string;
};

// 리뷰 목록 (테스트용)
const reviews = [
  {
    id: 1,
    name: 'kim**',
    writtenAt: '2024-07-17',
    rating: 5.0,
    content: '기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~',
  },
  {
    id: 2,
    name: 'lee**',
    writtenAt: '2024-07-15',
    rating: 4.8,
    content: '서비스가 좋았어요!',
  },
  {
    id: 3,
    name: 'park**',
    writtenAt: '2024-07-10',
    rating: 5.0,
    content: '완전 만족!',
  },
  {
    id: 4,
    name: 'choi**',
    writtenAt: '2024-07-08',
    rating: 4.5,
    content: '괜찮았어요!',
  },
  {
    id: 5,
    name: 'yoon**',
    writtenAt: '2024-07-05',
    rating: 5.0,
    content: '또 이용하고 싶어요.',
  },
  {
    id: 6,
    name: 'jung**',
    writtenAt: '2024-07-01',
    rating: 4.9,
    content: '친절한 기사님 감사합니다!',
  },
];

const ITEMS_PER_PAGE = 3;

export default function Page() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isQuoteRequested, setIsQuoteRequested] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showGeneralQuoteModal, setShowGeneralQuoteModal] =
    useState<boolean>(false);
  const [showSpecificQuoteModal, setShowSpecificQuoteModal] =
    useState<boolean>(false);

  // 리뷰
  const [currentPage, setCurrentPage] = useState(1);
  const [currentReviews, setCurrentReviews] = useState<Review[]>([]);

  // 로그인 상태 확인용 (테스트용)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 일반 견적 요청 상태 (테스트용)
  const [hasGeneralQuote, setHasGeneralQuote] = useState<boolean>(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    // 현재 페이지에 맞는 리뷰 리스트 계산
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentReviews(reviews.slice(startIndex, endIndex));
  }, [currentPage]);

  // 지정 견적 요청 핸들러
  const handleQuoteRequest = (): void => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // 비회원
      return;
    }
    if (!hasGeneralQuote) {
      setShowGeneralQuoteModal(true); //회원, 일반 견적 요청 x
      return;
    }
    setShowSpecificQuoteModal(true); // 지정 견적 요청
  };

  // 일반 견적 요청 페이지로 이동
  const goToGeneralQuote = (): void => {
    // 페이지 이동 로직
    // router.push('/user/quotes/request');
    setShowGeneralQuoteModal(false);
  };

  // 지정 견적 요청 확인
  const confirmSpecificQuote = (): void => {
    setIsQuoteRequested(true);
    setShowSpecificQuoteModal(false);
    // API 호출
    alert('지정 견적 요청이 완료되었습니다.');
  };

  // 로그인 페이지로 이동
  const goToLogin = (): void => {
    // router.push('/user/sign');
    setShowLoginModal(false);
  };

  return (
    <div className='relative flex flex-col items-center mx-auto w-full overflow-auto xl:mt-[56px] mt-6 pb-24'>
      <div className='flex w-full px-0 md:px-[72px] xl:px-[100px] max-w-[1600px] gap-[117px]'>
        <div className='flex flex-col gap-10 w-full flex-1'>
          <MoverInfo
            variant='quote'
            subVariant='completed'
            moverName='김코드'
            imageUrl={null}
            movingType={['small', 'office']}
            isCustomQuote={false}
            rating={5}
            experienceYears={7}
            quoteCount={334}
            favoriteCount={136}
            ratingCount={178}
            isFavoriteMoverList={false}
            description='고객님의 물품을 안전하게 운송해 드립니다.'
          />
          <HorizontalDivider />
          {/* 모바일 */}
          <div className='flex-col gap-10 pl-6 flex md:flex xl:hidden'>
            <ShareButtons text='나만 알기엔 아쉬운 기사님인가요?' />
          </div>
          <HorizontalDivider />

          <div className='gap-0 pl-6'>
            <PageHeader>상세설명</PageHeader>
            <p className='text-2lg text-[18px] font-regular'>
              안녕하세요. 이사업계 경력 7년으로 안전한 이사를 도와드리는
              김코드입니다. 고객님의 물품을 소중하고 안전하게 운송하여 드립니다.
              소형이사 및 가정이사 서비스를 제공하며 서비스 가능 지역은 서울과
              경기권입니다.
            </p>
          </div>
          <HorizontalDivider />

          <div className='gap-0 pl-6'>
            <PageHeader>제공 서비스</PageHeader>
            <div className='flex gap-3'>
              <ServiceBadge color='blue'>소형이사</ServiceBadge>
              <ServiceBadge color='blue'>가정이사</ServiceBadge>
            </div>
          </div>
          <HorizontalDivider />

          <div className='gap-0 pl-6'>
            <PageHeader>서비스 가능 지역</PageHeader>
            <div className='flex gap-3'>
              <ServiceBadge color='gray'>서울</ServiceBadge>
              <ServiceBadge color='gray'>대구</ServiceBadge>
            </div>
          </div>
          <HorizontalDivider />
          <RatingStat
            ratingCounts={{
              5: 170,
              4: 9,
              3: 0,
              2: 0,
              1: 0,
            }}
            averageRating={5.0}
            totalCount={178}
          />

          {/* 리뷰 리스트 */}
          {currentReviews.map((review) => (
            <ReviewBlock
              key={review.id}
              {...review}
            />
          ))}

          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(reviews.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* 데스크탑 */}
        <div className='w-[354px] gap-[40px] hidden md:hidden xl:flex flex-col'>
          <p className='text-xl font-semibold'>
            김코드 기사님에게 지정 견적을 요청해보세요!
          </p>

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
            className='max-w-md w-full'
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
            className='max-w-md w-full'
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
            className='max-w-md w-full'
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
