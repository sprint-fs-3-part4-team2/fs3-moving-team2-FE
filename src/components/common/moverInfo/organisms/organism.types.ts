export interface OrganismBaseProps {
  imageUrl: string | null;
  moverName: string;
}

export interface MoverDatePriceInfoProps extends OrganismBaseProps {
  date: Date;
  price: number;
  rating?: number;
}

export interface MoverStatInfoProps extends OrganismBaseProps {
  rating: number;
  ratingCount: number;
  experienceYears: number;
  isFavorite: boolean;
  favoriteCount: number;
  quoteCount: number;
  isFavoriteMoverInfo: boolean;
}
