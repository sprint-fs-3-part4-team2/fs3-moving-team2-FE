import getMyProfile from '@/services/auth/myProfile';
import { useQuery } from '@tanstack/react-query';

export default function useUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getMyProfile,
    staleTime: Infinity,
  });
}
