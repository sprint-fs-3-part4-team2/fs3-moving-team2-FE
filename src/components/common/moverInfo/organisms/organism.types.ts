export interface OrganismBaseProps {
  imageUrl: string | null;
  moverName: string;
}

export interface MoverDatePriceInfoProps extends OrganismBaseProps {
  movingDate: Date;
  price: number;
  rating?: number;
}

export interface MoverStatInfoProps extends OrganismBaseProps {
  rating: number;
  ratingCount: number;
  experienceYears: number;
  isFavorite?: boolean;
  favoriteCount: number;
  quoteCount: number;
  isFavoriteMoverList: boolean;
  onFavoriteClick?: () => void;
}
