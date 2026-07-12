import { useContext } from 'react';
import { QueryContext } from './16';

export function useInvalidateQuery() {
  const context = useContext(QueryContext);
  if (!context)
    throw new Error(
      'useInvalidateQuery must be used within a QueryClientProvider',
    );
  return context.invalidateQuery;
}
