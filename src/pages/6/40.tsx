import { useDeferredValue, useMemo, useState } from 'react';

interface SearchResult {
  id: string;
  name: string;
}

const SEARCH_RESULTS: Array<SearchResult> = [
  { id: '1', name: 'React' },
  { id: '2', name: 'React Query' },
  { id: '3', name: 'Redux' },
  { id: '4', name: 'Router' },
];

function performExpensiveFiltering(query: string): Array<SearchResult> {
  const normalizedQuery = query.toLowerCase();

  return SEARCH_RESULTS.filter((item) =>
    item.name.toLowerCase().includes(normalizedQuery),
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <SearchResults query={deferredQuery} />
    </div>
  );
}

function SearchResults({ query }: { query: string }) {
  const results = useMemo(() => {
    // 무거운 필터링 작업
    return performExpensiveFiltering(query);
  }, [query]);

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
