import { useInvalidateQuery } from './18';
import { useErrorBoundaryFallback } from './5';

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export function SmartErrorFallback({ userId }: { userId: string }) {
  const invalidateQuery = useInvalidateQuery();
  const { error, resetErrorBoundary } = useErrorBoundaryFallback();

  const handleRetry = () => {
    invalidateQuery(['user', userId]);
    resetErrorBoundary();
  };

  switch (true) {
    case error instanceof AuthError:
      return <AuthErrorFallback />;

    case error instanceof NetworkError:
      return <NetworkErrorFallback handleRetry={handleRetry} />;

    default:
      return <DefaultErrorFallback error={error} handleRetry={handleRetry} />;
  }
}

function AuthErrorFallback() {
  return (
    <div>
      <p>인증 오류가 발생했습니다. 로그인 페이지로 이동합니다.</p>
      <button type="button" onClick={() => (window.location.href = '/login')}>
        로그인 페이지로 이동
      </button>
    </div>
  );
}

function NetworkErrorFallback({ handleRetry }: { handleRetry: () => void }) {
  return (
    <div>
      <p>네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.</p>
      <button type="button" onClick={handleRetry}>
        다시 시도
      </button>
    </div>
  );
}

function DefaultErrorFallback({
  error,
  handleRetry,
}: {
  error: Error;
  handleRetry: () => void;
}) {
  return (
    <div>
      <p>알 수 없는 오류가 발생했습니다: {error.message}</p>
      <button type="button" onClick={handleRetry}>
        다시 시도
      </button>
    </div>
  );
}
