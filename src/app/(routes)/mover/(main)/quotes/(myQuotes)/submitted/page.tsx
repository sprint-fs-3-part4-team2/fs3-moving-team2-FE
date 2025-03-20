import SubmittedQuotesByMover from '@/components/submittedQuotesByMover';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className='w-full bg-backgroundVariants-100 h-full py-10'>
      <Suspense fallback={<div>Loading...</div>}>
        <SubmittedQuotesByMover />
      </Suspense>
    </div>
  );
}
