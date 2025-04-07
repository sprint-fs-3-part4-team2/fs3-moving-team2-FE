import { useRouter } from 'next/navigation';
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo';
import { Mover } from '@/services/moverService';

interface MoverListProps {
  movers: Mover[];
}

export default function MoverList({ movers }: MoverListProps) {
  const router = useRouter();

  if (movers.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-10'>
        <p className='text-gray-500'>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {movers.map((mover) => (
        <div
          key={mover.id}
          onClick={() => router.push(`/user/movers/${mover.id}`)}
          className='cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200'
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
            isFavorite={mover.isFavorite}
            favoriteCount={mover.favoriteCount ?? 0}
            isFavoriteMoverList={false}
            description={mover.description}
          />
        </div>
      ))}
    </>
  );
}
