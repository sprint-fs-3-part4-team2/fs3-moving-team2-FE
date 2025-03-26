import { getSubmittedQuotesList } from '@/services/moverQuotes';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

export const UseSubmittedQuotes = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageSize = 6;
  const router = useRouter();

  const submittedQuotes = useQuery({
    queryKey: ['submittedQuotes', page, pageSize],
    queryFn: async () => getSubmittedQuotesList({ page, pageSize }),
  });

  const onPageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return {
    page,
    submittedQuotes,
    onPageChange,
  };
};
