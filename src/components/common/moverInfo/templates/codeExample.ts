import { MoverInfoTemplateProps } from './template.types';

export const MoverInfoCodeSnippet = (props: MoverInfoTemplateProps) => {
  let code = `
\`\`\`tsx
import MoverInfo from '@/components/common/moverInfo/templates/moverInfo

    <MoverInfo
        variant="${props.variant}"
        subVariant="${props.subVariant}"
        moverName= "${props.moverName}", 
        movingType= "${props.movingType}", // 이사유형
        isCustomQuote= ${props.isCustomQuote}, // 지정견적요청 여부
        quoteState= "${props.quoteState}", // 견적상태 ["confirmedQuote","pendingQuote"]`;

  if (props.variant === 'quote')
    code += `
        rating= ${props.rating}, // 별점
        experienceYears= ${props.experienceYears}, // 경력
        quoteCount= ${props.quoteCount}, // 견적수
        isFavorite= ${props.isFavorite} // 찜 여부
        favoriteCount= ${props.favoriteCount}, // 찜 개수
        ratingCount= ${props.ratingCount} // 리뷰 개수
        price= ${props.price}, // 견적가 optional 견적가를 표시하고 싶으면 입력해주세요.`;
  if (props.variant === 'quote' && props.subVariant === 'pending')
    code += `    
        movingDate=${props.movingDate}, // 이사날짜 Date 객체
        departure="${props.departure}", // 출발지
        arrival="${props.arrival}", // 도착지
        onConfirmClick=() => alert(''), // 확정버튼 클릭 시 실행할 함수
        onDetailClick=() => alert('') // 상세보기 클릭 시 실행할 함수`;

  if (props.variant === 'quote' && props.subVariant === 'completed')
    code += `
        isFavoriteMoverList=${props.isFavoriteMoverList} // 기사님 찾기 페이지에서 찜한 기사님 목록에 사용할 경우 true
        description=${props.description} // 기사님 설명 optional
  `;

  if (props.variant === 'review') {
    code += `
        movingDate=${props.movingDate} // 이사 날짜
        price= ${props.price} // 견적가`;
    if (props.subVariant === 'pending')
      code += `
        onClickReviewButton="props.onClickReviewButton" // 리뷰작성 버튼을 누르면 실행할 함수
`;
    if (props.subVariant === 'written')
      code += `
        reviewContent="${props.reviewContent}" // 리뷰내용
        rating="${props.rating}" // 리뷰점수
        writtenAt="${props.writtenAt}" // 리뷰 작성 날짜
    `;
  }

  code += `/>`;
  return code;
};
