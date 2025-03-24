// MockData의 타입 정의
export interface MockDataType {
  driverName: string; // 기사님 이름
  movingType: ('small' | 'office' | 'home')[]; // 이사 유형 (배열)
  isCustomQuote: boolean; // 지정 견적 요청 여부
  quoteState: 'confirmedQuote' | 'pendingQuote'; // 견적 상태
  movingDate: Date; // 이사 날짜
  price: number; // 견적가
  reviewContent: string; // 리뷰 내용
  rating: number; // 별점
  writtenAt: Date; // 리뷰 작성 날짜
  imageUrl: string | null;
}

// Mock 데이터 적용
export const MockDataList: MockDataType[] = [
  {
    driverName: '안성재',
    movingType: ['small', 'office'],
    isCustomQuote: true,
    quoteState: 'confirmedQuote',
    movingDate: new Date('2024-07-01'),
    price: 210000,
    reviewContent:
      '처음 견적 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 원룸 이사는 믿고 맡기세요! :)',
    rating: 5,
    writtenAt: new Date('2024-07-02'),
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '김철수',
    movingType: ['home'],
    isCustomQuote: false,
    quoteState: 'pendingQuote',
    movingDate: new Date('2024-06-15'),
    price: 180000,
    reviewContent: '처음 이용해봤는데 서비스가 정말 좋았어요. 추천합니다!',
    rating: 4.5,
    writtenAt: new Date('2024-06-16'),
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '박영희',
    movingType: ['small', 'home'],
    isCustomQuote: true,
    quoteState: 'confirmedQuote',
    movingDate: new Date('2024-05-20'),
    price: 250000,
    reviewContent: '기사님이 너무 친절하시고, 짐도 안전하게 잘 옮겨주셨어요!',
    rating: 5,
    writtenAt: new Date('2024-05-21'),
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '이민호',
    movingType: ['office'],
    isCustomQuote: false,
    quoteState: 'pendingQuote',
    movingDate: new Date('2024-08-01'),
    price: 300000,
    reviewContent:
      '사무실 이전이라 걱정했는데, 빠르고 정확하게 진행해 주셨습니다.',
    rating: 4.8,
    writtenAt: new Date('2024-08-02'),
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '정수빈',
    movingType: ['home', 'office'],
    isCustomQuote: true,
    quoteState: 'confirmedQuote',
    movingDate: new Date('2024-09-10'),
    price: 270000,
    reviewContent: '이사 비용이 조금 높았지만, 서비스가 너무 만족스러웠어요!',
    rating: 5,
    writtenAt: new Date('2024-09-11'),
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '한지훈',
    movingType: ['small'],
    isCustomQuote: false,
    quoteState: 'pendingQuote',
    movingDate: new Date('2024-10-05'),
    price: 190000,
    reviewContent: '친절하고 빠르게 이사 도와주셔서 너무 감사했습니다!',
    rating: 0.5,
    writtenAt: new Date('2024-10-06'),
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '최유진',
    movingType: ['home', 'small'],
    isCustomQuote: true,
    quoteState: 'confirmedQuote',
    movingDate: new Date('2024-11-20'),
    price: 280000,
    reviewContent: '다음에도 꼭 다시 이용하고 싶은 기사님이세요! 최고!',
    rating: 5,
    writtenAt: new Date('2024-11-21'),
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '조성훈',
    movingType: ['office'],
    isCustomQuote: false,
    quoteState: 'pendingQuote',
    movingDate: new Date('2024-12-01'),
    price: 320000,
    reviewContent: '사무실 이사라서 걱정 많았는데, 믿음직한 서비스였습니다.',
    rating: 4.9,
    writtenAt: new Date('2024-12-02'),
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '강민석',
    movingType: ['home'],
    isCustomQuote: true,
    quoteState: 'confirmedQuote',
    movingDate: new Date('2025-01-10'),
    price: 230000,
    reviewContent: '가족 이사였는데, 꼼꼼하게 챙겨주셔서 감사했어요!',
    rating: 5,
    writtenAt: new Date('2025-01-11'),
  },
  {
    imageUrl:
      'https://d3h2ixicz4w2p.cloudfront.net/uploads/1742216810416-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-01-03%20131708.png',
    driverName: '오지혜',
    movingType: ['small', 'office'],
    isCustomQuote: false,
    quoteState: 'pendingQuote',
    movingDate: new Date('2025-02-15'),
    price: 260000,
    reviewContent: '이사 당일 비가 왔는데도 안전하게 잘 옮겨주셨어요!',
    rating: 4.6,
    writtenAt: new Date('2025-02-16'),
  },
];
