import { useEffect, useState } from 'react';
import BellIcon from '../../atoms/icons/bellIcon';
import NotificationDot from '../../atoms/icons/notificationDot';
import Alarm, { AlarmData } from '@/components/dropdown/children/alarm';
import { NOTIFICATION_STYLES } from './constant';
import { getNotificationApi } from '@/services/notification';
import { readNotificationApi } from '@/services/notification';

async function readAlarm(id: string) {
  await readNotificationApi(id);
}

export default function Notification(): JSX.Element {
  const [data, setData] = useState<AlarmData[]>([]);

  useEffect(() => {
    getNotificationApi().then((res) => {
      setData(res.data ?? []);
    });
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL || `http://localhost:8080`}/notification/events`,
    ); // 백엔드 SSE 엔드포인트

    // 메시지 수신
    eventSource.onmessage = (event) => {
      setData((prev) => {
        const parse = JSON.parse(event.data);
        if (prev.find((x) => x.id === parse.id)) return [...prev];
        return [parse, ...prev];
      });
    };

    // 오류 처리
    eventSource.onerror = (error) => {
      console.error('SSE 오류 발생:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Alarm
      readFn={(id) => {
        readAlarm(id);
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
        {data?.filter((x) => !x.isRead).length > 0 && <NotificationDot />}
      </div>
    </Alarm>
  );
}
