export default function NotificationDot(): JSX.Element {
  return <span className={NOTIFICATION_DOT_STYLES}></span>;
}

const NOTIFICATION_DOT_STYLES =
  'absolute top-[0px] right-[5px] bg-red-500 rounded-full w-[11px] h-[11px] xl:w-[12px] xl:h-[12px] shadow-primary';
