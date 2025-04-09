// 사용법은 같은 폴더 내의 README.md 파일 참조해주세요

import Image from 'next/image';
import React from 'react';

interface NoDataProps {
  text?: string;
}

const NoData: React.FC<NoDataProps> = ({
  text = '작성 가능한 리뷰가 없어요',
}) => {
  return (
    <div className='flex flex-col items-center'>
      {/*       <div className='group relative w-[214px] md:w-[321px] xl:w-[428px] h-[180px] md:h-[270px] xl:h-[360px]'> */}
      <div className='group relative w-[214px] md:w-[321px] h-[180px] md:h-[270px]'>
        <Image
          src='/img/no-data/no_data.png'
          alt='not_found'
          fill
          priority
          style={{ objectFit: 'cover' }}
          className='block group-hover:hidden'
        />
        <Image
          src='/img/no-data/no_data_empty.png'
          alt='not_found_hover'
          fill
          priority
          style={{ objectFit: 'cover' }}
          className='hidden group-hover:block'
        />
      </div>
      <div className='pt-[24px] xl:pt-[32px] text-grayscale-400 text-[16px] md:text-[24px]'>
        {text}
      </div>
    </div>
  );
};

export default NoData;
