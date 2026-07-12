import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useState, useTransition } from 'react';

interface User {
  id: string;
  name: string;
}

const USERS: Record<string, User> = {
  'user-1': { id: 'user-1', name: 'Alice' },
  'user-2': { id: 'user-2', name: 'Bob' },
};

async function fetchUser(userId: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return USERS[userId] ?? USERS['user-1'];
}

function ProfileSkeleton() {
  return <div className="text-sm text-gray-500">프로필을 불러오는 중...</div>;
}

function UserProfile({ userId }: { userId: string }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return <div>{user.name}</div>;
}

export default function UserList() {
  const [selectedId, setSelectedId] = useState('user-1');
  const [isPending, startTransition] = useTransition();

  const handleUserClick = (id: string) => {
    startTransition(() => {
      setSelectedId(id);
    });
  };

  return (
    <div className="flex gap-4">
      <nav>
        <button onClick={() => handleUserClick('user-1')}>Alice</button>
        <button onClick={() => handleUserClick('user-2')}>Bob</button>
        {isPending && <span className="text-sm">로딩 중...</span>}
      </nav>
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile userId={selectedId} />
      </Suspense>
    </div>
  );
}
