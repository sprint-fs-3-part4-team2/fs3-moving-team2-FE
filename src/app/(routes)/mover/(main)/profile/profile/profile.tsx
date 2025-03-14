import MoverStat from '@/components/common/moverStat/organisms/moverStat';

export default function profile() {
  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-xl font-bold'>이사업체 정보</h2>
      <MoverStat
        rating={4.8} // 별점 (평균 평점)
        ratingCount={250} // 총 리뷰 개수
        quoteCount={500} // 견적 받은 횟수
        years={10} // 경력 (이사업체 운영 연수)
        isFavoriteMoverInfo={false} // 즐겨찾기한 업체인지 여부
      />
    </div>
  );
}
