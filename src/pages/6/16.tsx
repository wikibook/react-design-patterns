import { createContext, ReactNode, useRef } from 'react';
import { Resource } from './15';

export type QueryKey = Array<unknown>;
export type QueryFunction<T = unknown> = () => Promise<T>;

interface QueryContextType {
  getQueryData: <T>(queryKey: QueryKey, queryFn: QueryFunction<T>) => T;
  invalidateQuery: (queryKey: QueryKey) => void;
}

export const QueryContext = createContext<QueryContextType | null>(null);

interface QueryClientProviderProps {
  children: ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  const cacheRef = useRef(new Map<string, Resource<unknown>>());

  const getQueryData = <T,>(
    queryKey: QueryKey,
    queryFn: QueryFunction<T>,
  ): T => {
    const cache = cacheRef.current;
    const cacheKey = JSON.stringify(queryKey);

    let resource = cache.get(cacheKey) as Resource<T> | undefined;

    // 실제 라이브러리는 안정적인 해시 함수를 사용하지만,
    // 여기서는 개념 설명을 위해 JSON.stringify로 단순화합니다.

    // 1) 캐시에 없으면 초기화 및 Promise 생성
    if (!resource) {
      console.log(`[Network] 데이터 요청 시작: ${cacheKey}`);

      const promise = queryFn()
        .then((data) => {
          cache.set(cacheKey, {
            status: 'success',
            data,
          });
        })
        .catch((error) => {
          cache.set(cacheKey, {
            status: 'error',
            error,
          });
        });

      // 객체 참조를 유지하기 위해 미리 할당
      resource = {
        status: 'pending',
        promise: promise as Promise<void>,
      };

      cache.set(cacheKey, resource);
    }

    // 2) 상태에 따른 처리
    if (resource.status === 'pending' && resource.promise) {
      // Suspense를 트리거하기 위해 Promise를 throw
      throw resource.promise;
    }

    if (resource.status === 'error') {
      // ErrorBoundary로 전파하기 위해 error 값을 throw
      throw resource.error instanceof Error
        ? resource.error
        : new Error('알 수 없는 요청 에러가 발생했습니다');
    }

    // status가 success라면 data는 반드시 존재함
    return resource.data as T;
  };

  const invalidateQuery = (queryKey: QueryKey) => {
    const cacheKey = JSON.stringify(queryKey);
    cacheRef.current.delete(cacheKey); // 캐시에서 제거 → 다음 렌더 시 재요청
  };

  return (
    <QueryContext.Provider value={{ getQueryData, invalidateQuery }}>
      {children}
    </QueryContext.Provider>
  );
}
