export interface OrganismBaseProps {
  imageUrl: string | null;
  moverName?: string;
}

export interface MoverDatePriceInfoProps extends OrganismBaseProps {
  movingDate: Date;
  price: number;
  rating?: number;
}

export interface MoverProfileProps extends OrganismBaseProps {
  rating: number;
  ratingCount: number;
  experienceYears: number;
  isFavorite?: boolean;
  favoriteCount: number;
  quoteCount: number;
  isFavoriteMoverList: boolean;
  introduction: string;
  movingType: string;
  regions: string;
}
