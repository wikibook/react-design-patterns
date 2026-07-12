import { useContext } from 'react';
import { QueryContext, QueryFunction, QueryKey } from './16';

interface UseCustomSuspenseQueryOptions<T> {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
}

export function useCustomSuspenseQuery<T>({
  queryKey,
  queryFn,
}: UseCustomSuspenseQueryOptions<T>): T {
  const context = useContext(QueryContext);

  if (!context) {
    throw new Error(
      'useCustomSuspenseQuery must be used within a QueryClientProvider',
    );
  }

  return context.getQueryData<T>(queryKey, queryFn);
}

export function useCustomSuspenseQueries<T>({
  queries,
}: {
  queries: Array<UseCustomSuspenseQueryOptions<T>>;
}): Array<T> {
  const context = useContext(QueryContext);

  if (!context) {
    throw new Error(
      'useCustomSuspenseQueries must be used within a QueryClientProvider',
    );
  }

  return queries.map(({ queryKey, queryFn }) =>
    context.getQueryData<T>(queryKey, queryFn),
  );
}
