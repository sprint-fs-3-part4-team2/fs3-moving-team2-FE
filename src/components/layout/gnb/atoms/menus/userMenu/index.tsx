import CustomLink from '../common/customLink';
import Text from '../common/gnbText';
import { COMMON_URL } from './constant';

export default function UserMenu(): JSX.Element {
  return (
    <>
      <CustomLink href='/user/quotes/request'>
        <Text linkHref={['/user/quotes/request', ...COMMON_URL]}>
          견적 요청
        </Text>
      </CustomLink>
      <CustomLink href='/user/movers'>
        <Text linkHref={['/user/movers', ...COMMON_URL]}>기사님 찾기</Text>
      </CustomLink>
      <CustomLink href='/user/quotes/pending'>
        <Text
          linkHref={[
            '/user/quotes/pending',
            '/user/quotes/requested',
            '/user/quotes/completed',
            ...COMMON_URL,
          ]}
        >
          내 견적 관리
        </Text>
      </CustomLink>
    </>
  );
}
