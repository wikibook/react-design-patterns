import { Suspense, useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from './5';

interface RetryErrorBoundaryProps {
  maxRetries?: number;
  retryDelay?: number;
  children: React.ReactNode;
  fallback?: (props: {
    error: Error;
    retryCount: number;
    reset: () => void;
  }) => React.ReactNode;
}

function RetryErrorBoundary({
  maxRetries = 3,
  retryDelay = 1000,
  children,
  fallback,
}: RetryErrorBoundaryProps) {
  const [retryCount, setRetryCount] = useState(0);
  const retry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  if (retryCount >= maxRetries) {
    return (
      <ErrorBoundary
        key={retryCount}
        fallback={(props) =>
          fallback ? (
            fallback({
              error: props.error,
              retryCount,
              reset: props.resetErrorBoundary,
            })
          ) : (
            <RetryExhaustedFallback
              error={props.error}
              retryCount={retryCount}
              reset={props.resetErrorBoundary}
            />
          )
        }
        onReset={() => setRetryCount(0)}
      >
        {children}
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary
      key={retryCount}
      fallback={
        <AutoRetryFallback
          retryCount={retryCount}
          maxRetries={maxRetries}
          retryDelay={retryDelay}
          onRetry={retry}
        />
      }
    >
      {children}
    </ErrorBoundary>
  );
}

function RetryExhaustedFallback({
  error,
  retryCount,
  reset,
}: {
  error: Error;
  retryCount: number;
  reset: () => void;
}) {
  return (
    <div>
      <p>위젯을 불러올 수 없습니다.</p>
      <p className="text-sm text-gray-500">{retryCount}회 재시도 실패</p>
      <p className="mt-1 text-sm text-gray-500">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-3 rounded bg-black px-3 py-2 text-white"
      >
        다시 시도
      </button>
    </div>
  );
}

function AutoRetryFallback({
  retryCount,
  maxRetries,
  retryDelay,
  onRetry,
}: {
  retryCount: number;
  maxRetries: number;
  retryDelay: number;
  onRetry: () => void;
}) {
  useEffect(() => {
    const delay = retryDelay * Math.pow(2, retryCount);
    const timer = window.setTimeout(() => {
      onRetry();
    }, delay);

    return () => window.clearTimeout(timer);
  }, [onRetry, retryCount, retryDelay]);

  return (
    <div>
      재시도 중... ({retryCount + 1}/{maxRetries})
    </div>
  );
}

// 사용 예시
export default function WidgetSection() {
  return (
    <RetryErrorBoundary
      maxRetries={3}
      fallback={({ retryCount, reset }) => (
        <div>
          <p>위젯을 불러올 수 없습니다.</p>
          <p className="text-sm text-gray-500">{retryCount}회 재시도 실패</p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 rounded bg-black px-3 py-2 text-white"
          >
            다시 시도
          </button>
        </div>
      )}
    >
      <Suspense fallback={<WidgetSkeleton />}>
        <RecommendationWidget />
      </Suspense>
    </RetryErrorBoundary>
  );
}

function WidgetSkeleton() {
  return (
    <div className="animate-pulse bg-gray-300 h-32 rounded">
      <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-400 rounded w-1/2"></div>
    </div>
  );
}

function RecommendationWidget(): never {
  throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
}
