export const RatingStarsCodeSnippet = () => {
  return `
\`\`\`tsx
import RatingStars from '@/components/common/shared/molecules/ratingStars';

    const [rating,setRating] = useState(0); // 별점을 눌렀을 때 점수를 변경하고 싶을 경우

    <RatingStars
        rating=rating // 클릭하는 위치에 따라 점수를 변경하고 싶다면 상태를 입력하고 특정 점수를 보여주고 싶다면 상수를 입력해주세요.
        onClick={setRating} // optional 별점을 눌렀을 때 실행할 함수 
        iconClassName="" // optional 별 아이콘에 적용할 클래스네임 (각 별 아이콘에 적용됨)
    />
`;
};
