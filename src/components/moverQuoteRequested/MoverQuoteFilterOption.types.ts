export interface FilterOption {
  id: string;
  label: string;
}

export const moveTypes: FilterOption[] = [
  { id: 'small', label: '소형이사' },
  { id: 'home', label: '가정이사' },
  { id: 'office', label: '사무실이사' },
];

export const filterTypes: FilterOption[] = [
  { id: 'service', label: '서비스 가능 지역' },
  { id: 'targeted', label: '지정 견적 요청' },
];
