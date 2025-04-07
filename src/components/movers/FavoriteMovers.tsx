import { useRouter } from 'next/navigation';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import { Mover } from '@/services/moverService';

interface FavoriteMoversProps {
  favoriteMovers: Mover[];
}

export default function FavoriteMovers({
  favoriteMovers,
}: FavoriteMoversProps) {
  const router = useRouter();

  return (
    <div className='flex flex-col w-full gap-4'>
      <p className='text-xl font-semibold'>찜한 기사님</p>

      {favoriteMovers.length > 0 ? (
        favoriteMovers.map((mover) => (
          <div
            key={mover.id}
            onClick={() => router.push(`/user/movers/${mover.id}`)}
            className='cursor-pointer'
          >
            <MoverInfo
              variant='quote'
              subVariant='completed'
              moverName={mover.moverName}
              imageUrl={mover.imageUrl || '/profile-placeholder.png'}
              movingType={mover.movingType}
              isCustomQuote={mover.isCustomQuote}
              rating={mover.rating ?? 0}
              ratingCount={mover.ratingCount}
              experienceYears={mover.experienceYears}
              quoteCount={mover.quoteCount}
              isFavorite={true}
              favoriteCount={mover.favoriteCount ?? 0}
              isFavoriteMoverList={true}
              description={mover.description}
            />
          </div>
        ))
      ) : (
        <div className='flex items-center justify-center py-20 text-gray-500'>
          <p>찜한 기사님이 없어요</p>
        </div>
      )}
    </div>
  );
}
