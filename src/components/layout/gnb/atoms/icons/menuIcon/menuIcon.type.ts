import { MouseEventHandler } from 'react';

export interface MenuIconProp {
  menuOnClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}
