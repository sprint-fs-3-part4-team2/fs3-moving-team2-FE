import CustomLink from '../common/customLink';
import Text from '../common/gnbText';

export default function GuestMenu(): JSX.Element {
  return (
    <CustomLink href='/user/movers'>
      <Text linkHref='/user/movers'>기사님 찾기</Text>
    </CustomLink>
  );
}
