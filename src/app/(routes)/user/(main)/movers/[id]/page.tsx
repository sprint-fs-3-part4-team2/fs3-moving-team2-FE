'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import HorizontalDivider from '@/components/common/customerInfo/atoms/horizontalDivider';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import RatingStat from '@/components/common/ratingStat/templates/ratingStat';
import ReviewBlock from '@/components/common/reviewBlock/template/reviewBlock';
import ShareButtons from '@/components/common/ShareButtons';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import ServiceBadge from '@/components/common/shared/atoms/serviceBadge';

import { useState } from 'react';
import filledHeart from '@/public/icons/favorite/filled.svg';
import redFilledHeart from '@/public/icons/favorite/red-filled.svg';
import Image from 'next/image';

export default function Page() {
  // 기사님 정보

  const [isFavorite, setIsFavorite] = useState(false);
  const [isQuoteRequested, setIsQuoteRequested] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleQuoteRequest = (): void => {
    if (!isQuoteRequested) {
      setShowModal(true);
    }
  };

  const confirmQuoteRequest = (): void => {
    setIsQuoteRequested(true);
    setShowModal(false);
  };

  return (
    <div className='relative flex flex-col items-center mx-auto w-full overflow-auto mt-[144px] pb-24'>
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

          <ReviewBlock
            name='kim**'
            writtenAt='2024-07-17'
            rating={5.0}
            content='기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~'
            className=''
          />

          <ReviewBlock
            name='kim**'
            writtenAt='2024-07-17'
            rating={5.0}
            content='기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~'
            className=''
          />

          <ReviewBlock
            name='kim**'
            writtenAt='2024-07-17'
            rating={5.0}
            content='기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~'
            className=''
          />

          <ReviewBlock
            name='kim**'
            writtenAt='2024-07-17'
            rating={5.0}
            content='기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~'
            className=''
          />

          <ReviewBlock
            name='kim**'
            writtenAt='2024-07-17'
            rating={5.0}
            content='기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~'
            className=''
          />

          <ReviewBlock
            name='kim**'
            writtenAt='2024-07-17'
            rating={5.0}
            content='기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~'
            className=''
          />
        </div>

        {/* 데스크탑 */}
        <div className='w-[354px] gap-[40px] hidden md:hidden xl:flex flex-col'>
          <p className='text-xl font-semibold'>
            김코드 기사님에게 지정 견적을 요청해보세요!
          </p>

          {!isQuoteRequested && (
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
          )}

          <CommonButton
            widthType='full'
            heightType='primary'
            backgroundColorType='blue'
            textColorType='white'
            onClick={handleQuoteRequest}
            disabled={isQuoteRequested}
          >
            {isQuoteRequested ? '지정 견적 요청 완료' : '지정 견적 요청하기'}
          </CommonButton>

          <HorizontalDivider />
          <ShareButtons text='견적서 공유하기' />
        </div>

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
              backgroundColorType='blue'
              textColorType='white'
              onClick={handleQuoteRequest}
            >
              {isQuoteRequested ? '지정 견적 요청 완료' : '지정 견적 요청하기'}
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
