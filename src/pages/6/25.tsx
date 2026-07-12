import { Suspense, useState, useTransition } from 'react';

// --- Mock Data & Types ---
type SearchResult = {
  id: number;
  title: string;
  category: string;
};

const MOCK_DATA: Array<SearchResult> = [
  { id: 1, title: 'React 19 Hooks 가이드', category: 'Frontend' },
  { id: 2, title: 'Next.js App Router 기초', category: 'Frontend' },
  { id: 3, title: 'Suspense와 에러 바운더리', category: 'React' },
  { id: 4, title: 'useTransition 활용하기', category: 'React' },
  { id: 5, title: '서버 컴포넌트 이해하기', category: 'Next.js' },
  { id: 6, title: '상태 관리의 역사', category: 'Architecture' },
];

type PromiseWithStatus<T> = Promise<T> & {
  status?: 'pending' | 'fulfilled' | 'rejected';
  value?: T;
  reason?: unknown;
};

// 가짜 API: 검색어에 따라 1초 후 결과를 반환
function fetchSearchResults(
  query: string,
): PromiseWithStatus<Array<SearchResult>> {
  const promise: PromiseWithStatus<Array<SearchResult>> = new Promise(
    (resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        resolve(
          MOCK_DATA.filter(
            (item) =>
              item.title.toLowerCase().includes(lowerQuery) ||
              item.category.toLowerCase().includes(lowerQuery),
          ),
        );
      }, 1000);
    },
  );

  // Suspense 처리를 위한 Promise 상태 추적
  promise.status = 'pending';
  promise.then(
    (value) => {
      promise.status = 'fulfilled';
      promise.value = value;
    },
    (reason) => {
      promise.status = 'rejected';
      promise.reason = reason;
    },
  );

  return promise;
}

// React의 use()와 유사하게 Promise의 값을 꺼내는 유틸리티
function unwrapPromise<T>(promise: PromiseWithStatus<T>): T {
  if (promise.status === 'fulfilled') return promise.value as T;
  if (promise.status === 'rejected') throw promise.reason;
  throw promise;
}

// --- Page Component ---
export default function SearchDemoPage() {
  const [query, setQuery] = useState('');
  const [searchPromise, setSearchPromise] = useState<PromiseWithStatus<
    Array<SearchResult>
  > | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // 상태 변경을 transition으로 감싸 기존 UI(입력창 등)가 블로킹되지 않도록 함
    if (newQuery.trim() === '') {
      startTransition(() => setSearchPromise(null));
    } else {
      startTransition(() => {
        setSearchPromise(fetchSearchResults(newQuery));
      });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">검색 시뮬레이션</h1>
        <p className="text-gray-500">
          useTransition과 Suspense를 사용하여 입력 중에도 UI가 멈추지 않는 검색
          경험을 구현합니다.
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="검색어를 입력하세요 (예: React, Next.js)"
          className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            isPending ? 'bg-gray-50 opacity-70' : 'bg-white'
          }`}
        />
        {isPending && (
          <div className="absolute right-3 top-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 min-h-42">
        <Suspense fallback={<LoadingSkeleton />}>
          <Results promise={searchPromise} query={query} />
        </Suspense>
      </div>
    </div>
  );
}

// --- Child Components ---
function Results({
  promise,
  query,
}: {
  promise: PromiseWithStatus<Array<SearchResult>> | null;
  query: string;
}) {
  if (!promise) {
    return (
      <div className="flex items-center justify-center h-full min-h-42 text-gray-500">
        검색어를 입력하여 결과를 확인해보세요.
      </div>
    );
  }

  const results = unwrapPromise(promise);

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-42 space-y-2 text-gray-500">
        <p>
          <span className="font-medium text-gray-700">&quot;{query}&quot;</span>
          에 대한 검색 결과가 없습니다.
        </p>
        <p className="text-sm">다른 키워드로 검색해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 font-medium">
        총 {results.length}개의 결과를 찾았습니다.
      </p>
      <ul className="space-y-3">
        {results.map((item) => (
          <li
            key={item.id}
            className="p-3 bg-white border border-gray-200 rounded-md shadow-sm"
          >
            <div className="font-semibold text-gray-800">{item.title}</div>
            <div className="text-sm text-blue-600 mt-1">{item.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}
