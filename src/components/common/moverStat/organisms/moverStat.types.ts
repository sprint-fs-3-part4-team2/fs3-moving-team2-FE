import { confirmedQuotesCountProps } from '../molecules/confirmedQuotesCount/confirmedQuotesCount.types';
import { ExperienceYearsProps } from '../molecules/experienceYears/experienceYears.types';
import { RatingProps } from '../molecules/ratingStat/rating.types';

export type MoverStatProps = confirmedQuotesCountProps &
  ExperienceYearsProps &
  RatingProps & {
    isFavoriteMoverInfo: boolean;
  };
