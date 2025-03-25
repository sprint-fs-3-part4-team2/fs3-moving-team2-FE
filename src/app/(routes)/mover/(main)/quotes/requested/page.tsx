'use client';

import CustomerInfo from '@/components/common/customerInfo/templates/customerInfo';
import SearchInput from '@/components/common/inputSection/atoms/customInput/inputs/searchInput';
import { MovingTypes } from '@/components/common/shared/atoms/movingTypeBadge/movingTypeBadge.types';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import { DropdownCta } from '@/components/dropdown/dropdown';
import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import noReviewImage from '@/public/img/no-review.svg';
import filterIcon from '@/public/icons/filter-blue.svg';
import MoverQuoteDeclineModal from '@/components/moverQuoteRequested/MoverQuoteDeclineModal';
import MoverQuoteSubmitModal from '@/components/moverQuoteRequested/MoverQuoteSubmitModal';
import MoverReceivedRequestFilter from '@/components/moverQuoteRequested/MoverReceivedRequestFilter';
import MoverReceivedRequestFilterModal from '@/components/moverQuoteRequested/MoverReceivedRequestFilterModal';

export interface CustomerRequest {
  quoteId: string;
  movingType: MovingTypes[];
  isCustomQuote: boolean;
  customerName: string;
  movingDate: Date;
  departure: string;
  arrival: string;
  variant: 'requested' | 'submitted';
  requestedAt: Date;
}

// 페이지 상단에 고객 요청 데이터를 배열로 정의
const customerRequests: CustomerRequest[] = [
  {
    quoteId: 'quoteId1',
    movingType: ['small', 'office'],
    isCustomQuote: false,
    customerName: '김코드',
    movingDate: new Date(),
    departure: '서울 중구',
    arrival: '경기 김포',
    variant: 'requested' as const,
    requestedAt: new Date(Date.now() - 3600000),
  },
  {
    quoteId: 'quoteId2',
    movingType: ['small'],
    isCustomQuote: true,
    customerName: '김코드',
    movingDate: new Date(),
    departure: '서울 중구',
    arrival: '경기 김포',
    variant: 'requested' as const,
    requestedAt: new Date(Date.now() - 3600000),
  },
];

export default function Page() {
  const [selected, setSelected] = useState<any | null>(null); // Dropdown 선택된 값
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false); // 제출 모달
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false); // 반려 모달
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false); // 필터 모달
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerRequest | null>(null); // 선택된 고객 요청

  // const [customerRequests, setCustomerRequests] = useState<CustomerRequest[]>(
  //   [],
  // );
  const totalCustomerRequests = customerRequests.length;

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, boolean>
  >({
    small: true,
    furniture: true,
    office: true,
    service: true,
    targeted: true,
  });

  const onSubmit = (data: FieldValues) => {
    console.log('Form data:', data);
  };

  console.log('selectedCustomer:', selectedCustomer);

  return (
    <main className='w-full xl:max-w-[1400px] mx-auto px-6 md:px-[72px]'>
      <PageHeader>받은 요청</PageHeader>
      <div className='flex gap-28 mt-6'>
        {/* 필터 */}
        <MoverReceivedRequestFilter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        {/* 고객 요청 리스트 */}
        <section className='flex-1 ml-4'>
          {/* 검색창 */}
          <SearchInput
            placeholder='어떤 고객님을 찾고 계세요?'
            onSearch={() => {}}
            styleVariant='secondary'
            inputVariant={'search'}
          />
          <div className='flex justify-between items-center mt-6 mb-8'>
            <h3 className='font-semibold'>전체 {totalCustomerRequests}건</h3>
            <div className='flex'>
              <DropdownCta
                // border={false}
                className={'mr-4 '}
                isOpen={isOpen}
                data={[
                  {
                    name: '이사 빠른순',
                  },
                  {
                    name: '요청일 빠른순',
                  },
                ]}
                name='area'
                dispatch={setSelected}
              />
              <button
                className='xl:hidden'
                onClick={() => setShowFilterModal(true)}
              >
                <Image
                  src={filterIcon}
                  alt='필터 아이콘'
                />
              </button>
            </div>
          </div>
          {totalCustomerRequests === 0 ? (
            <div className='flex justify-center items-center h-[400px] flex-col gap-6 xl:gap-8'>
              <Image
                src={noReviewImage}
                alt='현재 받은 요청 없어 표시하는 안내 이미지'
              />
              <p className='text-grayscale-400'>아직 받은 요청이 없어요!</p>
            </div>
          ) : (
            <ul>
              {/* 고객 요청 리스트 */}
              {customerRequests.map((customer) => (
                <li
                  key={customer.quoteId}
                  className='mb-12'
                >
                  <CustomerInfo
                    {...customer}
                    variant='requested'
                    onSubmit={() => {
                      setSelectedCustomer(customer);
                      setShowSubmitModal(true);
                    }}
                    onDecline={() => {
                      setSelectedCustomer(customer);
                      setShowDeclineModal(true);
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      {showSubmitModal && (
        <MoverQuoteSubmitModal
          selectedCustomer={selectedCustomer}
          setShowSubmitModal={setShowSubmitModal}
        />
      )}
      {showDeclineModal && (
        <MoverQuoteDeclineModal
          selectedCustomer={selectedCustomer}
          setShowDeclineModal={setShowDeclineModal}
        />
      )}
      {showFilterModal && (
        <MoverReceivedRequestFilterModal
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          onClose={() => setShowFilterModal(false)}
        />
      )}
    </main>
  );
}
