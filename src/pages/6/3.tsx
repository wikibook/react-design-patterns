import { Suspense } from 'react';
import { useCustomSuspenseQuery } from './17';
import { ErrorBoundary } from './5';
import { ErrorFallback } from './6';

type User = {
  id: string;
  name: string;
};

export async function fetchUser(userId: string): Promise<User> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(`userId ${userId} 사용자 정보를 가져오는 데 실패했습니다`),
      );
    }, 1000);
  });
}

export function UserProfile({ userId }: { userId: string }) {
  const user = useCustomSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return (
    <div>
      <span>userId: {userId}</span>
      <span>name: {user.name}</span>
    </div>
  );
}

export default function Page() {
  const userId = '100'; // 존재하지 않는 사용자 ID

  return (
    <ErrorBoundary fallback={<ErrorFallback userId={userId} />}>
      <Suspense fallback={<div>사용자 정보를 불러오는 중입니다...</div>}>
        <UserProfile userId={userId} /> {/* 존재하지 않는 사용자 ID */}
      </Suspense>
    </ErrorBoundary>
  );
}
