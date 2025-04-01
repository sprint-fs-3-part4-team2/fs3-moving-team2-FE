'use client';

import { UseSubmittedQuotes } from '@/hooks/useSubmittedQuotes';
import ExistingQuotes from './existingQuotes';
import NoQuoteToDisplay from './noQuoteToDisplay';
import SubmittedQuotesSkeleton from './submittedQuotesSkeleton';

export default function SubmittedQuotesByMover() {
  const { submittedQuotes, onPageChange, page } = UseSubmittedQuotes();
  const { data, isLoading } = submittedQuotes;

  if (isLoading) return <SubmittedQuotesSkeleton />;

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
