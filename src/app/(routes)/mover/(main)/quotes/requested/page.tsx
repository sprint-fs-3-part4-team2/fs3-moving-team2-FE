'use client';

import CustomerInfo from '@/components/common/customerInfo/templates/customerInfo';
import SearchInput from '@/components/common/inputSection/atoms/customInput/inputs/searchInput';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import { DropdownCta } from '@/components/dropdown/dropdown';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import noReviewImage from '@/public/img/no-review.svg';
import filterIcon from '@/public/icons/filter-blue.svg';
import MoverQuoteDeclineModal from '@/components/moverQuoteRequested/MoverQuoteDeclineModal';
import MoverQuoteSubmitModal from '@/components/moverQuoteRequested/MoverQuoteSubmitModal';
import MoverReceivedRequestFilter from '@/components/moverQuoteRequested/MoverReceivedRequestFilter';
import MoverReceivedRequestFilterModal from '@/components/moverQuoteRequested/MoverReceivedRequestFilterModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  CustomerRequest,
  QuoteRequestsResponse,
} from '@/services/types/allQuotes/allQuoteRequests.types';
import { getAllQuoteRequests } from '@/services/quoteRequests';
import { moveTypes } from '@/components/moverQuoteRequested/MoverQuoteFilterOption.types';
import Pagination from '@/components/pagination/molecule/pagination';
import Loading from '@/app/loading';

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false); // 제출 모달
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false); // 반려 모달
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false); // 필터 모달
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerRequest | null>(null); // 선택된 고객 요청

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, boolean>
  >(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedFilters');
      return saved
        ? JSON.parse(saved)
        : {
            small: false,
            home: false,
            office: false,
            service: false,
            targeted: false,
          };
    }
    return {
      small: false,
      home: false,
      office: false,
      service: false,
      targeted: false,
    };
  });

  const [query, setQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sortBy');
      return saved ? saved : '이사빠른순';
    }
    return '이사빠른순';
  });

  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지

  // 선택된 이사 유형을 쉼표로 구분된 문자열로 변환
  const selectedMoveTypes = moveTypes
    .filter((option) => selectedFilters[option.id])
    .map((option) => option.label)
    .join(',');

  // 필터 값 추출
  const isServiceRegionMatch = selectedFilters.service;
  const isTargetedQuote = selectedFilters.targeted;

  const {
    data: customerRequests,
    isLoading,
    isError,
    isPending,
  } = useQuery<QuoteRequestsResponse, Error>({
    queryKey: [
      'customerRequests',
      currentPage,
      query,
      selectedMoveTypes,
      sortBy,
      isServiceRegionMatch,
      isTargetedQuote,
    ],
    queryFn: () =>
      getAllQuoteRequests(
        currentPage, // page
        10, // pageSize
        query, // search
        selectedMoveTypes, // moveType
        sortBy, // sortBy (필요 시 추가)
        isServiceRegionMatch,
        isTargetedQuote,
      ),
    placeholderData: keepPreviousData, // 이전 데이터를 유지, 페이지네이션 시 깜빡임 방지
  });

  const totalCustomerRequests = customerRequests?.totalCount ?? 0;

  useEffect(() => {
    const savedFilters = localStorage.getItem('selectedFilters');
    const savedSortBy = localStorage.getItem('sortBy');
    if (savedFilters) {
      setSelectedFilters(JSON.parse(savedFilters));
    }
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sortBy', sortBy);
    }
  }, [sortBy]);

  return (
    <main className='w-full xl:max-w-[1400px] mx-auto sm:px-6 md:px-[72px] xl:px-0'>
      <PageHeader>받은 요청</PageHeader>
      <div className='flex gap-28 mt-6'>
        {/* 필터 */}
        <MoverReceivedRequestFilter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        {/* 고객 요청 리스트 */}
        <section className='flex-1'>
          {/* 검색창 */}
          <SearchInput
            placeholder='어떤 고객님을 찾고 계세요?'
            onSearch={() => {}}
            styleVariant='secondary'
            inputVariant={'search'}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className='flex justify-between items-center mt-6 mb-8'>
            <h3 className='font-semibold'>전체 {totalCustomerRequests}건</h3>
            <div className='flex'>
              <DropdownCta
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
                dispatch={(value: string | object) => {
                  if (typeof value === 'string') {
                    setSortBy(value.replace(/\s+/g, ''));
                  }
                }}
                border={false}
                allbtn={false}
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
          {isLoading && (
            <div className='flex justify-center items-center h-[400px]'>
              <Loading />
            </div>
          )}
          {isError && (
            <div className='flex justify-center items-center h-[400px]'>
              <p>에러가 발생했습니다.</p>
            </div>
          )}
          {totalCustomerRequests === 0 && !isLoading && !isError ? (
            // 고객 요청이 없을 때
            <div className='flex justify-center items-center h-[400px] flex-col gap-6 xl:gap-8'>
              <Image
                src={noReviewImage}
                alt='현재 받은 요청 없어 표시하는 안내 이미지'
              />
              <p className='text-grayscale-400'>아직 받은 요청이 없어요!</p>
            </div>
          ) : (
            <>
              <ul>
                {/* 고객 요청 리스트 */}
                {customerRequests?.list?.map((customer) => (
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
              <div className='flex justify-center items-center mt-6 mb-8'>
                <Pagination
                  currentPage={currentPage}
                  totalPages={customerRequests?.totalPages ?? 1}
                  onPageChange={(currentPage) => {
                    window.scrollTo(0, 100);
                    setCurrentPage(currentPage);
                  }}
                />
              </div>
            </>
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
