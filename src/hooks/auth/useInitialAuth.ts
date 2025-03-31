// hooks/useInitialAuth.ts
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useInitialAuth = () => {
  const { login } = useUserStore();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/users/me');
        return response.data;
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 10, // 10분
  });

  useEffect(() => {
    if (userData) {
      login(userData);
    }
  }, [userData, login]);

  return { isLoading };
};
