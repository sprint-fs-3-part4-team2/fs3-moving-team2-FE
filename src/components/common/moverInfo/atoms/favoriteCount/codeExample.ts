import { FavoriteCountProps } from './favoriteCount.types';

export const FavoriteCountCodeExample = (props: FavoriteCountProps) => {
  return `
\`\`\`tsx
import FavoriteCountProps from '@/components/common/moverInfo/atoms/favoriteCount';

    <FavoriteCountProps
        favoriteCount="${props.favoriteCount}"
        isFavorite=${props.isFavorite} // optional 입력될 경우 true면 빨간색 배경 false면 비어있는 하트 , undefined이면 검은색 배경
        textClassName="" // optional 텍스트에 적용할 클래스
        iconClassName="" // optional 아이콘에 적용할 클래스
    />
`;
};
