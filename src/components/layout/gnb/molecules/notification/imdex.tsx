import { useState } from 'react';
import BellIcon from '../../atoms/icons/bellIcon';
import NotificationDot from '../../atoms/icons/notificationDot';
import { NotificationProps } from './notification.type';
import Alarm from '@/components/dropdown/children/alarm';
import { NOTIFICATION_STYLES } from './constant';

export default function Notification({
  hasNotification,
}: NotificationProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Alarm
      {...args}
      isOpen={isOpen}
    >
      <div className={NOTIFICATION_STYLES}>
        <BellIcon />
        {hasNotification && <NotificationDot />}
      </div>
    </Alarm>
  );
}

const args = {
  className: '',
  isOpen: false,
  data: [
    {
      id: 'asdf',
      is_read: false,
      create_at: new Date('2025-03-07T12:00:00Z'),
      message: '메시지',
      url: '#',
    },
    {
      id: 'asdf2',
      is_read: false,
      create_at: new Date('2025-03-06T12:00:00Z'),
      message: '메시지2',
      url: '#',
    },
    {
      id: 'asdf3',
      is_read: false,
      create_at: new Date('2025-03-10T12:00:00Z'),
      message: '메시지3',
      url: '#',
    },
    {
      id: 'asdf4',
      is_read: false,
      create_at: new Date('2025-03-10T12:00:00Z'),
      message: '메시지4',
      url: '#',
    },
  ],
};
