import cn from '@/utils/cn';
import MoverStat from '../../../moverStat/organisms/moverStat';
import ProfileImage from '../../../shared/atoms/profileImage';
import FavoriteCount from '../../atoms/favoriteCount';
import MoverName from '../../atoms/moverName';
import { MoverStatInfoProps } from '../organism.types';

export default function MoverStatInfo({
  imageUrl,
  moverName,
  rating,
  ratingCount,
  experienceYears,
  isFavorite,
  favoriteCount,
  quoteCount,
  isFavoriteMoverInfo,
}: MoverStatInfoProps) {
  return (
    <div
      className={cn(
        'flex relative items-center',
        isFavoriteMoverInfo
          ? 'gap-3 px-[10px] py-[10px]'
          : 'gap-6 px-[10px] md:px-[10px] xl:px-[18px] py-[10px] md:py-[10px] xl:py-[16px]',
        'border-[1px] border-line-100 rounded-[6px]',
      )}
    >
      <ProfileImage
        imageUrl={imageUrl}
        className={cn(
          'w-[46px]  h-[46px]',
          !isFavoriteMoverInfo &&
            'md:w-[46px] xl:w-[56px] md:h-[46px] xl:h-[56px]',
        )}
      />
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
          <MoverName
            sizeVariant={isFavoriteMoverInfo ? 'tertiary' : 'secondary'}
            moverName={moverName}
          />
        </div>
        <div>
          <MoverStat
            rating={rating}
            ratingCount={ratingCount}
            quoteCount={quoteCount}
            years={experienceYears}
            isFavoriteMoverInfo={isFavoriteMoverInfo}
          />
        </div>
      </div>
      <div
        className={cn(
          'absolute',
          isFavoriteMoverInfo
            ? 'right-[10px] top-[10px]'
            : 'right-[18px] top-[16px]',
        )}
      >
        <FavoriteCount
          favoriteCount={favoriteCount}
          isFavorite={isFavorite}
          iconClassName={'w-[24px] h-[24px]'}
          textClassName={
            isFavoriteMoverInfo
              ? 'text-[13px] md:text-[13px] xl:text-[13px]'
              : 'text-[13px] md:text-[13px] xl:text-[18px]'
          }
        />
      </div>
    </div>
  );
}
