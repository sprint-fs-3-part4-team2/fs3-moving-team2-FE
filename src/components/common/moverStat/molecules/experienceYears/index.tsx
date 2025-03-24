import StatContainer from '../../atoms/statContainer';
import StatText from '../../atoms/statText';
import { ExperienceYearsProps } from './experienceYears.types';

export default function ExperienceYears({
  years,
  isFavoriteMoverInfo,
}: ExperienceYearsProps) {
  return (
    <StatContainer isFavoriteMoverList={isFavoriteMoverInfo}>
      <StatText variant='secondary'>경력</StatText>
      <StatText variant='primary'>{years.toLocaleString()}년</StatText>
    </StatContainer>
  );
}
