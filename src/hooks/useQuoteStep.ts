import { StepType } from '@/components/quoteRequest/quoteStep.types';
import { useCallback, useState } from 'react';

export function useQuoteStep<T>({
  stepName,
  maxCompletedStep,
  data,
  onNext,
  onExitEdit,
  updateStoreData,
}: {
  stepName: StepType;
  maxCompletedStep: number;
  data: T | null;
  onNext: () => void;
  onExitEdit: () => void;
  updateStoreData: (data: T) => void;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false); // 수정 완료 시, 애니메이션 효과를 위해

  const handleCompleteEdit = useCallback(() => {
    if (data) {
      updateStoreData(data);
    }
  }, []);
}
