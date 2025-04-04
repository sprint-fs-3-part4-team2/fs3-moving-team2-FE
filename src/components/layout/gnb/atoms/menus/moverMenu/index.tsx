import CustomLink from '../common/customLink';
import Text from '../common/gnbText';

export default function MoverMenu(): JSX.Element {
  return (
    <>
      <CustomLink href='/mover/quotes/requested'>
        <Text linkHref='/mover/quotes/requested'>받은 요청</Text>
      </CustomLink>
      <CustomLink href='/mover/quotes/submitted'>
        <Text linkHref={['/mover/quotes/submitted', '/mover/quotes/declined']}>
          내 견적 관리
        </Text>
      </CustomLink>
    </>
  );
}
