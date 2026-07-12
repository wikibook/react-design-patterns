import { useInvalidateQuery } from './18';
import { useErrorBoundaryFallback } from './5';

export function ErrorFallback({ userId }: { userId: string }) {
  const invalidateQuery = useInvalidateQuery();
  const { error, resetErrorBoundary } = useErrorBoundaryFallback();

  const handleRetry = () => {
    invalidateQuery(['user', userId]);
    resetErrorBoundary();
  };

  return (
    <div>
      <p>에러가 발생했습니다: {error.message}</p>
      <button type="button" onClick={handleRetry}>
        다시 시도
      </button>
    </div>
  );
}
