import { getMyProfile } from '@/services/profileService';
import { useQuery } from '@tanstack/react-query';

export const useProfileQuery = () => {
  const data = useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    staleTime: Infinity,
  });

  return data;
};
