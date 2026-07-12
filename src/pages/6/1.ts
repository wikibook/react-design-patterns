import { useEffect, useState } from 'react';

type AsyncStatus = 'pending' | 'success' | 'error';
type AsyncFetchStatus = 'fetching' | 'idle';

type UseAsyncResult<T> = {
  status: AsyncStatus;
  fetchStatus: AsyncFetchStatus;
  data: T | null;
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isIdle: boolean;
};

export function useAsync<T>(asyncFn: () => Promise<T>): UseAsyncResult<T> {
  const [snapshot, setSnapshot] = useState<{
    settledAsyncFn: (() => Promise<T>) | null;
    settledStatus: AsyncStatus;
    data: T | null;
    error: Error | null;
  }>({
    settledAsyncFn: null,
    settledStatus: 'pending',
    data: null,
    error: null,
  });

  useEffect(() => {
    let isCancelled = false;

    asyncFn()
      .then((result) => {
        if (isCancelled) return;
        setSnapshot({
          settledAsyncFn: asyncFn,
          settledStatus: 'success',
          data: result,
          error: null,
        });
      })
      .catch((err) => {
        if (isCancelled) return;
        const nextError =
          err instanceof Error
            ? err
            : new Error('알 수 없는 오류가 발생했습니다.');

        setSnapshot((prevSnapshot) => ({
          settledAsyncFn: asyncFn,
          settledStatus: 'error',
          data: prevSnapshot.data,
          error: nextError,
        }));
      });

    return () => {
      isCancelled = true;
    };
  }, [asyncFn]);

  const isCurrentRequestSettled = snapshot.settledAsyncFn === asyncFn;
  const status = isCurrentRequestSettled
    ? snapshot.settledStatus
    : snapshot.settledStatus === 'success'
      ? 'success'
      : 'pending';
  const fetchStatus: AsyncFetchStatus = isCurrentRequestSettled
    ? 'idle'
    : 'fetching';
  const data = snapshot.data;
  const error = isCurrentRequestSettled ? snapshot.error : null;

  const isPending = status === 'pending';
  const isSuccess = status === 'success';
  const isError = status === 'error';
  const isFetching = fetchStatus === 'fetching';
  const isRefetching = isFetching && !isPending;
  const isIdle = fetchStatus === 'idle';

  return {
    status,
    fetchStatus,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isFetching,
    isRefetching,
    isIdle,
  };
}
