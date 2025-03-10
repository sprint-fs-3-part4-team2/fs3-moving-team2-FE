import { RatingStatProps } from './ratingStat.types';

export const RatingStatCodeSnippet = (props: RatingStatProps) => {
  return `
\`\`\`tsx
import RatingStat from '@/components/common/ratingStat/templates/ratingStat';

    <RatingStat
        ratingCounts={
                        5: 500,
                        4: 500,
                        3: 300,
                        2: 100,
                        1: 100,
                    },
        averageRating=${props.averageRating} // 평균 점수
        totalCount=${props.totalCount} // 리뷰 총 수량
    />
`;
};
