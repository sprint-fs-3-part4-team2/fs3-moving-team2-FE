export const GNBCodeSnippet = `
\`\`\`tsx
import GNB from '@/components/layout/gnb/template/index';

<GNB
  isUserAuthorized={true} // 인가 여부
  userType='customer' // customer, mover, guest 3가지의 타입이 존재
  userName={'안성재'} // 유저 이름
  imageUrl={'/img/sample-profile/sample-2.svg'} // 유저 프로필 이미지
  hasNotification={true} // 알림 존재 여부(1개 이상)
/>
\`\`\`
`;
