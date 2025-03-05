import { C2 } from '../types/type';
import animate from '../components/style/animate.module.css';

export default function Animate({ className = '', children }: C2) {
  return (
    <div className={`${animate.filed} ${className}`.trim()}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </div>
  );
}
