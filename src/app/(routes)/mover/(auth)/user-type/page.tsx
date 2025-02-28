import common from './asset/common.gif';
import mover from './asset/mover.gif';
import UserType from './components/userType';

export default function Page() {
  return (
    <div className='w-full relative h-screen'>
      <ul className='flex justify-between items-center w-3/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black-100'>
        <UserType src={common} />
      </ul>
    </div>
  );
}
