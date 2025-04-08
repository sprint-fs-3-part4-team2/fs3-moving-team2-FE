'use client';

import { UseSubmittedQuotes } from '@/hooks/useSubmittedQuotes';
import ExistingQuotes from './existingQuotes';
import NoQuoteToDisplay from './noQuoteToDisplay';
import Loading from '@/app/loading';

export default function SubmittedQuotesByMover() {
  const { submittedQuotes, onPageChange, page } = UseSubmittedQuotes();
  const { data, isLoading } = submittedQuotes;

  if (isLoading) return <Loading />;

  if (data)
    return (
      <ExistingQuotes
        data={data}
        onPageChange={onPageChange}
        page={page}
      />
    );
  return <NoQuoteToDisplay />;
}
