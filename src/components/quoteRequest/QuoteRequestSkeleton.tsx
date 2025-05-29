import Loading from '@/app/loading';

export function QuoteRequestSkeleton() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Loading />
    </div>
  );
}
