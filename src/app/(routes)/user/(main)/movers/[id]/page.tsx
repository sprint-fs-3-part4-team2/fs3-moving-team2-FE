import MoverStatInfo from '@/components/common/moverInfo/organisms/moverStatInfo';

export default function Page() {
  // 기사님 정보

  return (
    <div>
      <section className='flex items-center justify-center mt-[144px]'>
        <div>
          <MoverStatInfo
            imageUrl='/img/sample-profile/sample-1.svg'
            moverName='홍길동 이사'
            rating={4.8}
            ratingCount={120}
            experienceYears={10}
            isFavorite={false}
            favoriteCount={45}
            quoteCount={30}
            isFavoriteMoverList={false}
          />
        </div>
      </section>
    </div>
  );
}
