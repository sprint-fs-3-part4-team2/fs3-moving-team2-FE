'use client';

import { useState } from 'react';
import QuoteRequestPage from '../../../../../../components/quoteRequest/QuoteRequestPage';
import QuoteRequestInProgressPage from '../../../../../../components/quoteRequest/QuoteRequestInProgressPage';

export default function Page() {
  const [isRequest, setIsRequest] = useState(false); // 견적 요청을 보낸 것이 있는지 없는지 판단

  return isRequest ? (
    <QuoteRequestInProgressPage />
  ) : (
    <QuoteRequestPage setIsRequest={setIsRequest} />
  );
}
