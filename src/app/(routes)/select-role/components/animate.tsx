import animate from '../components/style/animate.module.css';
import { CSSProperties, PropsWithChildren } from 'react';

interface AnimateProps extends PropsWithChildren {
  size?: string;
  className?: string;
  color?: CSSProperties['color'] | string;
}

export default function Animate({
  className = '',
  children,
  size = '5px',
  color,
}: AnimateProps) {
  const sharedStyle: CSSProperties = {
    position: 'absolute',
    borderColor: color,
    transition: '0.5s',
    borderStyle: 'solid',
  };

  return (
    <div className={`${animate.filed} ${className}`.trim()}>
      <span
        style={{
          borderTop: size,
          ...sharedStyle,
        }}
      ></span>
      <span
        style={{
          borderRight: size,

          ...sharedStyle,
        }}
      ></span>
      <span style={{ borderBottom: size, ...sharedStyle }}></span>
      <span style={{ borderLeft: size, ...sharedStyle }}></span>
      {children}
    </div>
  );
}
