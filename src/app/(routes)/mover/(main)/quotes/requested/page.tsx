'use client';

import SearchInput from '@/components/common/inputSection/atoms/customInput/inputs/searchInput';
import PageHeader from '@/components/common/shared/atoms/pageHeader';
import { useState } from 'react';

import MoverQuoteDeclineModal from '@/components/moverQuoteRequested/MoverQuoteDeclineModal';
import MoverQuoteSubmitModal from '@/components/moverQuoteRequested/MoverQuoteSubmitModal';
import MoverReceivedRequestFilterSidebar from '@/components/moverQuoteRequested/MoverReceivedRequestFilterSidebar';
import MoverReceivedRequestFilterModal from '@/components/moverQuoteRequested/MoverReceivedRequestFilterModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  CustomerRequest,
  QuoteRequestsResponse,
} from '@/services/types/allQuotes/allQuoteRequests.types';
import { getAllQuoteRequests } from '@/services/quoteRequests';
import { moveTypes } from '@/components/moverQuoteRequested/MoverQuoteFilterOption.types';
import { useLocalStorage } from '@/hooks/useStorage';
import { FilterIcon } from '@/components/moverQuoteRequested/FilterIcon';
import SortingOptions from '@/components/moverQuoteRequested/SortingOptions';
import QuoteList from '@/components/moverQuoteRequested/QuoteList';

export default function RequestedQuotesPage() {
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false); // 제출 모달
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false); // 반려 모달
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false); // 필터 모달
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerRequest | null>(null); // 선택된 고객 요청
  const [query, setQuery] = useState<string>(''); // 검색어

  const [selectedFilters, setSelectedFilters, removeSelectedFilters] =
    useLocalStorage<Record<string, boolean>>('selectedFilters', {
      small: false,
      home: false,
      office: false,
      service: false,
      targeted: false,
    }); // 필터 상태

  const [sortBy, setSortBy] = useLocalStorage<string>('sortBy', '이사빠른순'); // 드롭다운 정렬 상태

  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지

  // 선택된 이사 유형을 쉼표로 구분된 문자열로 변환
  const selectedMoveTypes = moveTypes
    .filter((option) => selectedFilters[option.id])
    .map((option) => option.label)
    .join(',');

  // 필터 값 추출
  const isServiceRegionMatch = selectedFilters.service;
  const isTargetedQuote = selectedFilters.targeted;

  const { data, isLoading, isError } = useQuery<QuoteRequestsResponse, Error>({
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
        sortBy, // sortBy
        isServiceRegionMatch,
        isTargetedQuote,
      ),
    placeholderData: keepPreviousData, // 이전 데이터를 유지, 페이지네이션 시 깜빡임 방지
  });

  const totalCustomerRequests = data?.totalCount ?? 0;

  return (
    <main className='w-full xl:max-w-[1400px] mx-auto sm:px-6 md:px-[72px] xl:px-0'>
      <PageHeader>받은 요청</PageHeader>

      <div className='flex gap-28 mt-6'>
        {/* 필터 사이드바 */}
        <MoverReceivedRequestFilterSidebar
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
              <SortingOptions
                onChange={setSortBy}
                options={[{ name: '이사 빠른순' }, { name: '요청일 빠른순' }]}
              />
              <button
                className='xl:hidden'
                onClick={() => setShowFilterModal(true)}
              >
                <FilterIcon />
              </button>
            </div>
          </div>

          <QuoteList
            customerRequests={data}
            isLoading={isLoading}
            isError={isError}
            totalCustomerRequests={totalCustomerRequests}
            currentPage={currentPage}
            totalPages={data?.totalPages ?? 1}
            onPageChange={(page) => {
              window.scrollTo(0, 100);
              setCurrentPage(page);
            }}
            onSubmitQuote={(customer) => {
              setSelectedCustomer(customer);
              setShowSubmitModal(true);
            }}
            onDeclineQuote={(customer) => {
              setSelectedCustomer(customer);
              setShowDeclineModal(true);
            }}
          />
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
