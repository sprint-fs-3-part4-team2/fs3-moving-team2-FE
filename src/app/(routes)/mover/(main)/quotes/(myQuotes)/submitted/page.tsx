import Loading from '@/app/loading';
import SubmittedQuotesByMover from '@/components/submittedQuotesByMover';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className='flex w-full bg-backgroundVariants-100 flex-1 py-10'>
      <Suspense fallback={<Loading />}>
        <SubmittedQuotesByMover />
      </Suspense>
    </div>
  );
}
