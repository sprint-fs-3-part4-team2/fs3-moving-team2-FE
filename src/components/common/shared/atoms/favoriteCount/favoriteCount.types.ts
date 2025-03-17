export interface FavoriteCountProps {
  favoriteCount: number;
  isFavorite?: boolean;
  textClassName?: string;
  iconClassName?: string;
  onClick?: () => void;
}
