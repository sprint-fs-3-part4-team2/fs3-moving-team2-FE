import { BACKDROP_STYLES } from "./constant";

export default function Backdrop({ children }: { children: React.ReactNode }) {
  return <div className={BACKDROP_STYLES}>{children}</div>;
}
