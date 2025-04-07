import {
  CustomerRequest,
  QuoteRequestsResponse,
} from '@/services/types/allQuotes/allQuoteRequests.types';
import CustomerInfo from '../../common/customerInfo/templates/customerInfo';
import NoData from '../../noData/NoData';
import Loading from '@/app/loading';
import Pagination from '../../pagination/molecule/pagination';

interface QuoteListProps {
  customerRequests?: QuoteRequestsResponse | null;
  isLoading: boolean;
  isError: boolean;
  totalCustomerRequests: number;
  onSubmitQuote: (customer: CustomerRequest) => void;
  onDeclineQuote: (customer: CustomerRequest) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function QuoteList({
  customerRequests,
  isLoading,
  isError,
  totalCustomerRequests,
  onSubmitQuote,
  onDeclineQuote,
  currentPage,
  totalPages,
  onPageChange,
}: QuoteListProps) {
  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;
  if (totalCustomerRequests === 0) return <EmptyView />;

  return (
    <>
      <ul>
        {customerRequests?.list?.map((customer) => (
          <li
            key={customer.quoteId}
            className='mb-12'
          >
            <CustomerInfo
              {...customer}
              variant='requested'
              onSubmit={() => onSubmitQuote(customer)}
              onDecline={() => onDeclineQuote(customer)}
            />
          </li>
        ))}
      </ul>
      {/* Pagination 컴포넌트 */}
      <div className='flex justify-center items-center mt-6 mb-8'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

const LoadingView = () => (
  <div className='flex justify-center items-center h-[400px]'>
    <Loading />
  </div>
);

const ErrorView = () => (
  <div className='flex justify-center items-center h-[400px]'>
    <p>에러가 발생했습니다.</p>
  </div>
);

const EmptyView = () => (
  <div className='flex justify-center items-center h-[400px] flex-col gap-6 xl:gap-8'>
    <NoData text='아직 받은 요청이 없어요!' />
  </div>
);
