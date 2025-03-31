export type StepType = '이사종류' | '이사예정일' | '이사예정시간' | '이사지역';

export interface MovingStepProps {
  onNext: () => void;
  onEdit: () => void;
  onExitEdit: () => void;
  step: StepType;
  maxCompletedStep: number;
  containerRef?: React.RefObject<HTMLDivElement>;
}
