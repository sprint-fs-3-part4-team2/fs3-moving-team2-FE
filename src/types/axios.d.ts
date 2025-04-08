import { AxiosError } from 'axios';

declare global {
  type ApiError = AxiosError<{ message: string }>;
}

export {};
