import { useErrorBoundaryFallback } from './5';
import { AuthError, NetworkError } from './28';

type RecoveryAction = 'retry' | 'reauth' | 'home';

function resolveRecoveryAction(error: Error): RecoveryAction {
  if (error instanceof NetworkError) {
    return 'retry';
  }

  if (error instanceof AuthError) {
    return 'reauth';
  }

  return 'home';
}

export function ProgressiveErrorFallback() {
  const { error, resetErrorBoundary } = useErrorBoundaryFallback();

  switch (resolveRecoveryAction(error)) {
    case 'reauth':
      return (
        <button onClick={() => (window.location.href = '/login')}>
          로그인하기
        </button>
      );

    case 'retry':
      return <button onClick={resetErrorBoundary}>다시 시도</button>;

    default:
      return (
        <button onClick={() => (window.location.href = '/')}>
          홈으로 이동
        </button>
      );
  }
}
