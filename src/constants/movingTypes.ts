export const MOVING_TYPES = {
  small: { key: 'small', value: '소형이사' },
  office: { key: 'office', value: '사무실이사' },
  home: { key: 'home', value: '가정이사' },
} as const;

export const MOVING_STATE = {
  custom: { key: 'custom', value: '지정 견적 요청' },
  confirmedQuote: { key: 'confirmedQuote', value: '확정 견적' },
  pendingQuote: { key: 'pendingQuote', value: '견적 대기' },
} as const;

export const MOVING_TYPE_DECODER = {
  SMALL_MOVE: 'small',
  OFFICE_MOVE: 'office',
  HOME_MOVE: 'home',
} as const;
