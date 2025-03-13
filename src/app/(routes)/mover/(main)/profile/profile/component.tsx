'use client';

import cn from '@/utils/cn';
import MoverStat from '@/components/common/moverStat/organisms/moverStat';
import ProfileImage from '@/components/common/shared/atoms/profileImage';
import FavoriteCount from '@/components/common/shared/atoms/favoriteCount';
import { MoverProfileProps } from './profile.types';
import ListInfoTitle from '@/components/common/shared/atoms/listInfoTitle';
import MoverName from '../moverName';

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
    <div className='bg-gray-100 pb-6'>
      <div className='flex flex-col'>
        <MoverName
          moverName={moverName}
          sizeVariant='primary'
        />
        <div>고객님의 물품을 소중하고 안전하게 운송하여 드립니다.</div>
      </div>
      <div
        className={cn(
          'pb-6 flex relative items-center bg-backgroundVariants-100 border-line-200 mx-24 ',
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
  );
}
