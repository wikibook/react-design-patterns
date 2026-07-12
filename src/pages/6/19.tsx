import { Suspense, useState } from 'react';
import { fetchUser } from './9';
import { QueryClientProvider } from './16';
import { useCustomSuspenseQuery } from './17';

interface Post {
  id: number;
  title: string;
}

const fetchPosts = async (userId: string): Promise<Array<Post>> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { id: 1, title: `${userId}의 첫 번째 글` },
    { id: 2, title: `${userId}의 두 번째 글` },
  ];
};

interface UserIdProps {
  userId: string;
}

function UserProfile({ userId }: UserIdProps) {
  const user = useCustomSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return (
    <div className="p-4 border rounded-lg mb-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold mb-2">👤 사용자 프로필</h3>
      <p>
        이름: <span className="font-medium">{user.name}</span>
      </p>
    </div>
  );
}

function UserPosts({ userId }: UserIdProps) {
  const posts = useCustomSuspenseQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPosts(userId),
  });

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-2">📝 작성한 글</h3>
      <ul className="list-disc list-inside">
        {posts.map((post) => (
          <li key={post.id} className="text-gray-700">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [currentId, setCurrentId] = useState<string>('1');

  return (
    <QueryClientProvider>
      <div className="p-8 max-w-2xl mx-auto font-sans">
        <h1 className="text-2xl font-bold mb-6">
          Suspense 기반 데이터 페칭 구현
        </h1>

        <div className="mb-6 space-x-2">
          <button
            onClick={() => setCurrentId('1')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            철수 (User 1)
          </button>
          <button
            onClick={() => setCurrentId('2')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            영희 (User 2)
          </button>
        </div>

        <hr className="my-6" />

        <p className="mb-4">
          현재 선택된 ID: <strong>{currentId}</strong>
        </p>

        {/* Suspense 경계 */}
        <Suspense
          fallback={
            <h2 className="text-blue-500 font-bold animate-pulse">
              User 로딩 중...
            </h2>
          }
        >
          <UserProfile userId={currentId} />

          {/* 중첩 Suspense */}
          <Suspense
            fallback={
              <h3 className="text-green-500 font-bold animate-pulse mt-4">
                Post 로딩 중...
              </h3>
            }
          >
            <UserPosts userId={currentId} />
          </Suspense>
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}
