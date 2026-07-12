import { useDeferredValue, useState, useTransition } from 'react';
import type { ChangeEvent } from 'react';

function Spinner({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return <span>{size === 'sm' ? '⏳' : 'Loading...'}</span>;
}

function SearchResults({ query }: { query: string }) {
  return <div>{query}에 대한 검색 결과</div>;
}

export default function LoadingIndicators() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const isStale = query !== deferredQuery;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;

    setInput(next);
    startTransition(() => {
      setQuery(next);
    });
  };

  return (
    <div>
      {/* 패턴 1: 입력 필드 내 인라인 스피너 */}
      <div className="relative">
        <input value={input} onChange={handleChange} />
        {isPending && (
          <div className="absolute right-2 top-2">
            <Spinner size="sm" />
          </div>
        )}
      </div>

      {/* 패턴 2: 상단 Progress Bar (YouTube 스타일) */}
      {isPending && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse" />
      )}

      {/* 패턴 3: 결과 목록 Opacity 변화 */}
      <div className={isStale ? 'opacity-60 transition-opacity' : ''}>
        <SearchResults query={deferredQuery} />
      </div>

      {/* 패턴 4: Overlay with message */}
      {isPending && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow">검색 중입니다...</div>
        </div>
      )}
    </div>
  );
}
