import CustomerInfo from '@/components/common/customerInfo/templates/customerInfo';

const Quotes = [
  {
    quoteId: '1',
    variant: 'submitted',
    movingType: ['small'],
    quoteState: 'confirmedQuote',
    isCustomQuote: true,
    customerName: '김인서',
    movingDate: new Date(),
    arrival: '경기 김포',
    departure: '서울 중구',
    quotePrice: 50000,
    completed: false,
    declined: false,
  },
  {
    quoteId: '1',
    variant: 'submitted',
    movingType: ['small'],
    quoteState: 'confirmedQuote',
    isCustomQuote: true,
    customerName: '김인서',
    movingDate: new Date(),
    arrival: '경기 김포',
    departure: '서울 중구',
    quotePrice: 50000,
    completed: false,
    declined: false,
  },
  {
    quoteId: '1',
    variant: 'submitted',
    movingType: ['small'],
    quoteState: 'confirmedQuote',
    isCustomQuote: true,
    customerName: '김인서',
    movingDate: new Date(),
    arrival: '경기 김포',
    departure: '서울 중구',
    quotePrice: 50000,
    completed: true,
    declined: false,
  },
  {
    quoteId: '1',
    variant: 'submitted',
    movingType: ['small'],
    quoteState: 'confirmedQuote',
    isCustomQuote: true,
    customerName: '김인서',
    movingDate: new Date(),
    arrival: '경기 김포',
    departure: '서울 중구',
    quotePrice: 50000,
    completed: true,
    declined: false,
  },
  {
    quoteId: '1',
    variant: 'submitted',
    movingType: ['small'],
    quoteState: 'confirmedQuote',
    isCustomQuote: true,
    customerName: '김인서',
    movingDate: new Date(),
    arrival: '경기 김포',
    departure: '서울 중구',
    quotePrice: 50000,
    completed: true,
    declined: false,
  },
  {
    quoteId: '1',
    variant: 'submitted',
    movingType: ['small'],
    quoteState: 'confirmedQuote',
    isCustomQuote: true,
    customerName: '김인서',
    movingDate: new Date(),
    arrival: '경기 김포',
    departure: '서울 중구',
    quotePrice: 50000,
    completed: true,
    declined: false,
  },
];

export default function Page() {
  return (
    <div>
      <div className='w-full bg-backgroundVariants-100 h-full py-10'>
        <div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 max-w-[1400px] px-6 md:px-[72px] xl:px-0 mx-auto gap-[24px] gap-y-12'>
          {Quotes.map((quote) => (
            <CustomerInfo
              key={quote.customerName}
              quoteId={quote.quoteId}
              variant='submitted'
              movingType={['small']}
              quoteState='confirmedQuote'
              isCustomQuote={true}
              customerName='김인서'
              movingDate={new Date()}
              arrival='경기 김포'
              departure='서울 중구'
              completed={quote.completed}
              declined={false}
              quotePrice={quote.quotePrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
