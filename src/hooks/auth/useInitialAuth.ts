// hooks/useInitialAuth.ts
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserProfile from './useUserProfile';

export const useInitialAuth = () => {
  const { data: userData, isLoading } = useUserProfile();

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  return { userData, isLoading };
};
