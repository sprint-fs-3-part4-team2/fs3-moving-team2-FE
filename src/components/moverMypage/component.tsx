'use client';

import cn from '@/utils/cn';
import MoverStat from '@/components/common/moverStat/organisms/moverStat';
import ProfileImage from '@/components/common/shared/atoms/profileImage';
import FavoriteCount from '@/components/common/shared/atoms/favoriteCount';
import { MoverProfileProps } from './profile.types';
import ListInfoTitle from '@/components/common/shared/atoms/listInfoTitle';
import MoverName from '../common/moverInfo/atoms/moverName';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import Image from 'next/image';
import PageHeader from '../common/shared/atoms/pageHeader';

export default function MoverStatInfo({
  imageUrl,
  rating,
  ratingCount,
  experienceYears,
  isFavorite,
  moverName = '김코드',
  favoriteCount,
  quoteCount,
  isFavoriteMoverList,
}: MoverProfileProps) {
  return (
    <div className=''>
      <PageHeader>마이페이지</PageHeader>
      <div className='bg-background-100 border border-grayscale-100 p-[24px] rounded-[16px]'>
        <div className='flex justify-between gap-y-[24px] '>
          <div className='flex flex-col'>
            <MoverName
              moverName={moverName}
              sizeVariant='primary'
            />
            <div className='text-gray-400'>
              고객님의 물품을 소중하고 안전하게 운송하여 드립니다.
            </div>
          </div>
          <div className='flex gap-[16px] w-[576px] '>
            <CommonButton
              widthType='half'
              heightType='secondary'
              backgroundColorType='gray'
              borderColorsType='gray'
              textColorType='gray'
            >
              <div className='flex items-center justify-center gap-2'>
                기본 정보 수정
                <Image
                  src='/icons/edit.svg'
                  alt='수정 아이콘'
                  width={24}
                  height={24}
                  className='grayscale brightness-50'
                />
              </div>
            </CommonButton>
            <CommonButton
              widthType='half'
              heightType='secondary'
              backgroundColorType='blue'
              borderColorsType='none'
              textColorType='white'
            >
              <div className='flex items-center justify-center gap-2'>
                내 프로필 수정
                <Image
                  src='/icons/edit.svg'
                  alt='수정 아이콘'
                  width={24}
                  height={24}
                />
              </div>
            </CommonButton>
          </div>
        </div>
        <div
          className={cn(
            ' flex relative items-center bg-background-100 border-line-200 mt-24 ',
            isFavoriteMoverList
              ? 'gap-3 px-[10px] py-[10px]'
              : 'gap-4 md:gap-4 xl:ga-6 px-[10px] md:px-[10px] xl:px-[18px] py-[10px] md:py-[10px] xl:py-[16px]',
            'border-[1px] border-line-100 rounded-[6px]',
          )}
        >
          <ProfileImage
            imageUrl={imageUrl}
            className={cn(
              'w-[46px]  h-[46px]',
              !isFavoriteMoverList &&
                'md:w-[46px] xl:w-[56px] md:h-[46px] xl:h-[56px]',
            )}
          />
          <div className='flex flex-col gap-2 w-full border-line-200'>
            <div className='flex justify-between items-center'>
              <MoverStat
                rating={rating}
                ratingCount={ratingCount}
                quoteCount={quoteCount}
                years={experienceYears}
                isFavoriteMoverInfo={isFavoriteMoverList}
              />

              <FavoriteCount
                favoriteCount={favoriteCount}
                isFavorite={isFavorite}
                iconClassName={'w-[24px] h-[24px]'}
                textClassName={
                  isFavoriteMoverList
                    ? 'text-[13px]'
                    : 'text-[13px] md:text-[13px] xl:text-[18px]'
                }
              />
            </div>
            <div className='flex flex-row items-center gap-4'>
              <div className='flex items-center space-x-2'>
                <ListInfoTitle>제공 서비스</ListInfoTitle>
                <span className='font-medium'>소형이사, 가정이사 </span>
              </div>
              <span className='text-gray-300'>|</span>
              <div className='flex items-center space-x-2'>
                <ListInfoTitle>지역</ListInfoTitle>
                <span className='font-medium'>서울, 경기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
