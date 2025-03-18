export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export const moveTypes: FilterOption[] = [
  { id: 'small', label: '소형이사', count: 10 },
  { id: 'furniture', label: '가정이사', count: 2 },
  { id: 'office', label: '사무실이사', count: 8 },
];

export const filterTypes: FilterOption[] = [
  { id: 'service', label: '서비스 가능 지역', count: 10 },
  { id: 'targeted', label: '지정 견적 요청', count: 10 },
];
