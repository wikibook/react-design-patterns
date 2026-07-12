import { useErrorBoundaryFallback } from './5';

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export function SmartErrorFallback() {
  const { error, resetErrorBoundary } = useErrorBoundaryFallback();

  if (error instanceof AuthError) {
    return (
      <div className="p-6 border-2 border-yellow-500 rounded-lg">
        <h2 className="text-xl font-bold mb-2">🔒 인증이 필요합니다</h2>
        <button onClick={() => (window.location.href = '/login')}>
          로그인하기
        </button>
      </div>
    );
  }

  if (error instanceof NetworkError) {
    return (
      <div className="p-6 border-2 border-red-500 rounded-lg">
        <h2 className="text-xl font-bold mb-2">📡 네트워크 오류</h2>
        <button onClick={resetErrorBoundary}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className="p-6 border-2 border-gray-500 rounded-lg">
      <h2 className="text-xl font-bold mb-2">⚠️ 예상치 못한 오류</h2>
      <button onClick={resetErrorBoundary}>다시 시도</button>
      <button onClick={() => (window.location.href = '/')}>홈으로</button>
    </div>
  );
}
