import { PropsWithChildren } from 'react';

export interface C1 {
  className?: string;
}

export interface C2 extends PropsWithChildren {
  className?: string;
}
