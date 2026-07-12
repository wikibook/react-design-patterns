import { Suspense, useState } from 'react';
import { ErrorBoundary } from './5';

type Resource<T> =
  | { status: 'pending'; promise: Promise<void> }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

const cache = new Map<string, Resource<string>>();

function queryFn(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('프로필 요청에 실패했습니다.')), 700);
  });
}

function readProfile(cacheKey: string): string {
  const cached = cache.get(cacheKey);

  if (!cached) {
    const promise = queryFn()
      .then((data) => {
        cache.set(cacheKey, { status: 'success', data });
      })
      .catch((rawError: unknown) => {
        const error =
          rawError instanceof Error
            ? rawError
            : new Error('알 수 없는 요청 에러가 발생했습니다.');

        cache.set(cacheKey, {
          status: 'error',
          error,
        });
      });

    cache.set(cacheKey, { status: 'pending', promise });
    throw promise;
  }

  if (cached.status === 'pending') {
    throw cached.promise;
  }

  if (cached.status === 'error') {
    throw cached.error;
  }

  return cached.data;
}

function Profile({ cacheKey }: { cacheKey: string }) {
  const profile = readProfile(cacheKey);
  return <p>{profile}</p>;
}

export default function PromiseRejectBridgeExample() {
  const [version, setVersion] = useState(0);
  const cacheKey = `profile-${version}`;

  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <div>
          <p>{error.message}</p>
          <button
            type="button"
            onClick={() => {
              cache.delete(cacheKey);
              setVersion((current) => current + 1);
              resetErrorBoundary();
            }}
          >
            다시 시도
          </button>
        </div>
      )}
    >
      <Suspense fallback={<p>프로필을 불러오는 중입니다...</p>}>
        <Profile cacheKey={cacheKey} />
      </Suspense>
    </ErrorBoundary>
  );
}
