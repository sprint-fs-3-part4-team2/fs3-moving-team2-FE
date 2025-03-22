import CustomLink from '../common/customLink';
import Text from '../common/gnbText';

export default function UserMenu(): JSX.Element {
  return (
    <>
      <CustomLink href='/user/quotes/request'>
        <Text
          linkHref={[
            '/user/quotes/request',
            '/user/reviews/pending',
            '/user/reviews/completed',
          ]}
        >
          견적 요청
        </Text>
      </CustomLink>
      <CustomLink href='/user/movers'>
        <Text
          linkHref={[
            '/user/movers',
            '/user/reviews/pending',
            '/user/reviews/completed',
          ]}
        >
          기사님 찾기
        </Text>
      </CustomLink>
      <CustomLink href='/user/quotes/pending'>
        <Text
          linkHref={[
            '/user/quotes/pending',
            '/user/reviews/pending',
            '/user/reviews/completed',
            '/user/quotes/requested',
            '/user/quotes/completed',
          ]}
        >
          내 견적 관리
        </Text>
      </CustomLink>
    </>
  );
}
