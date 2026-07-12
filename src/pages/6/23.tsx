import { Suspense } from 'react';
import { ErrorBoundary } from './5';
import { useCustomSuspenseQuery } from './17';

type UserData = {
  name: string;
  email: string;
  avatar: string;
};

type StatsData = {
  posts: number;
  followers: number;
  following: number;
};

type ActivityData = {
  id: number;
  action: string;
  time: string;
};

const fetchUserProfile = async (): Promise<UserData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👤',
  };
};

const fetchStatistics = async (): Promise<StatsData> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    posts: 120,
    followers: 300,
    following: 180,
  };
};

const fetchRecentActivity = async (): Promise<Array<ActivityData>> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    { id: 1, action: 'Liked a post', time: '2 hours ago' },
    { id: 2, action: 'Commented on a post', time: '3 hours ago' },
    { id: 3, action: 'Started following Alice', time: '5 hours ago' },
  ];
};

export default function Dashboard() {
  return (
    <div>
      <Header /> {/* 정적 콘텐츠 */}
      <div className="grid grid-cols-2 gap-4">
        <ErrorBoundary fallback={<ErrorFallback section="profile" />}>
          <Suspense fallback={<Skeleton type="profile" />}>
            <UserProfile />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<ErrorFallback section="stats" />}>
          <Suspense fallback={<Skeleton type="stats" />}>
            <Statistics />
          </Suspense>
        </ErrorBoundary>
      </div>
      <ErrorBoundary fallback={<ErrorFallback section="activity" />}>
        <Suspense fallback={<Skeleton type="activity" />}>
          <RecentActivity />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function Header() {
  return <h1 className="text-2xl font-bold mb-4">Dashboard</h1>;
}

function Skeleton({ type }: { type: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-300 ${type === 'profile' ? 'h-24' : type === 'stats' ? 'h-16' : 'h-32'} rounded`}
    ></div>
  );
}

function ErrorFallback({ section }: { section: string }) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded shadow">
      {section} 데이터를 불러오지 못했습니다.
    </div>
  );
}

function UserProfile() {
  const userData = useCustomSuspenseQuery({
    queryKey: ['dashboard', 'user-profile'],
    queryFn: fetchUserProfile,
  });

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">User Profile</h2>

      <div className="flex items-center space-x-4">
        <div className="text-4xl">{userData.avatar}</div>
        <div>
          <p className="font-bold">{userData.name}</p>
          <p className="text-sm text-gray-600">{userData.email}</p>
        </div>
      </div>
    </div>
  );
}

function Statistics() {
  const statsData = useCustomSuspenseQuery({
    queryKey: ['dashboard', 'statistics'],
    queryFn: fetchStatistics,
  });

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Statistics</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{statsData.posts}</p>
          <p className="text-sm text-gray-600">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{statsData.followers}</p>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{statsData.following}</p>
          <p className="text-sm text-gray-600">Following</p>
        </div>
      </div>
    </div>
  );
}

function RecentActivity() {
  const activityData = useCustomSuspenseQuery({
    queryKey: ['dashboard', 'recent-activity'],
    queryFn: fetchRecentActivity,
  });

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>

      <ul className="space-y-2">
        {activityData.map((activity) => (
          <li key={activity.id} className="flex justify-between items-center">
            <p>{activity.action}</p>
            <span className="text-sm text-gray-600">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
