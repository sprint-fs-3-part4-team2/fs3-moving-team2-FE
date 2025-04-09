import { useEffect, useState } from 'react';
import BellIcon from '../../atoms/icons/bellIcon';
import NotificationDot from '../../atoms/icons/notificationDot';
import Alarm, { AlarmData } from '@/components/dropdown/children/alarm';
import { getNotificationApi } from '@/services/notification';
import { readNotificationApi } from '@/services/notification';
import { NOTIFICATION_STYLES } from '../../styles/variables';
import { useQuery, useQueryClient } from '@tanstack/react-query';

async function readAlarm(id?: string) {
  if (!id) return;
  await readNotificationApi(id);
}

export default function Notification(): JSX.Element {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['userProfile']);
  const {
    data: notification,
    isStale,
    refetch,
  } = useQuery({
    queryKey: ['notification'],
    queryFn: getNotificationApi,
    staleTime: 1000 * 30,
    enabled: !!user,
  });
  const [data, setData] = useState<AlarmData[]>([]);
  useEffect(() => {
    refetch();
  }, [isStale]);

  useEffect(() => {
    setData(notification?.data ?? []);
  }, [notification]);

  useEffect(() => {
    // 문서 가시성 변경 핸들러
    const handleVisibilityChange = () => {
      if (document.hidden) {
        queryClient.setQueryDefaults(['notification'], { staleTime: Infinity });
      } else {
        queryClient.setQueryDefaults(['notification'], {
          staleTime: 1000 * 30,
        });
      }
    };

    // visibilitychange 이벤트 등록
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <Alarm
      readFn={(id) => {
        readAlarm(id ?? '');
        setData((prev) => {
          return prev.map((noti) => {
            if (noti.id === id) noti.isRead = true;
            return noti;
          });
        });
      }}
      data={data}
    >
      <div className={NOTIFICATION_STYLES}>
        <BellIcon />
        {data?.filter((x) => !x.isRead)?.length > 0 && <NotificationDot />}
      </div>
    </Alarm>
  );
}
