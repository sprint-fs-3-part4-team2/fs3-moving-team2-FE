import GuestMenu from '../../atoms/menus/guestMenu';
import UserMenu from '../../atoms/menus/userMenu';
import MoverMenu from '../../atoms/menus/moverMenu';
import { useProfileQuery } from '@/hooks/auth/useProfileQuery';

export default function GNBMenu() {
  const menuMap = {
    guest: <GuestMenu />,
    customer: <UserMenu />,
    mover: <MoverMenu />,
  };
  const { data, isFetched } = useProfileQuery();

  if (isFetched)
    return (
      <div className='hidden xl:flex xl:gap-10 '>
        {menuMap[data?.userType || 'guest']}
      </div>
    );
}
