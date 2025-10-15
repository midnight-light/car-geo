import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiErrorData } from '../api/api.types';
import React from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiErrorData>;
  }
}
export const withQuery = (component: () => React.ReactNode) => () => (
  <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>
);
