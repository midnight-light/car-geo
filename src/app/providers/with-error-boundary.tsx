import React from 'react';
import ErrorBoundary from '@/shared/ui/error-boundary';

export const withErrorBoundary = (component: () => React.ReactNode) => () => (
  <ErrorBoundary>{component()}</ErrorBoundary>
);