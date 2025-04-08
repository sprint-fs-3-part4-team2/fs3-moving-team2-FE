'use client';

import CommonButton from '@/components/common/commonBtn/commonBtn';
import MovingInfo from '@/components/common/movingInfo/organisms/movingInfo';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import { getQuoteRequest } from '@/services/quoteRequests';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import noQuoteImage from '@/public/img/car.svg';
import Image from 'next/image';

export default function QuoteRequestSummaryPage() {
  const { data } = useQuery({
    queryKey: ['myQuoteRequest'],
    queryFn: getQuoteRequest,
  });

  return (
    <main className='min-h-[calc(100vh-55px)] xl:min-h-[calc(100vh-89px)] flex flex-col'>
      <nav className='px-6 md:px-[72px] '>
        <div className='w-full md:w-[600px] xl:w-[1400px] mx-auto'>
          <PageHeader>견적요청</PageHeader>
        </div>
      </nav>
      <section className='flex-1 bg-backgroundVariants-200 flex flex-col items-center justify-center'>
        {data?.quote ? (
          <MovingInfo
            requestedDate={data.quote.requestedDate}
            movingType={data.quote.moveType}
            movingDate={data.quote.moveDate}
            departure={data.quote.departure.fullAddress}
            arrival={data.quote.arrival.fullAddress}
          />
        ) : (
          <Image
            src={noQuoteImage}
            alt='견적요청 없음'
          />
        )}

        <div className='w-[271px] xl:w-[402px] mt-8'>
          <div className='text-center mb-8 text-grayscale-400 text-sm xl:text-xl'>
            <p>현재 진행 중인 이사 견적이 있어요!</p>
            <p>진행 중인 이사 완료 후 새로운 견적을 받아보세요.</p>
          </div>
          <Link href='/user/quotes/pending'>
            <CommonButton
              widthType='full'
              heightType='primary'
            >
              받은 견적 보러가기
            </CommonButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
