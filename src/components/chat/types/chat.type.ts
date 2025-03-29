export interface MessageResponse {
  content: string;
  createdAt: Date;
  userId: string;
}

export interface RowProps {
  index: number;
  style?: React.CSSProperties;
}
