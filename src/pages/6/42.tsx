import { Suspense, useDeferredValue, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

interface SearchItem {
  id: string;
  title: string;
}

const SEARCH_ITEMS: Array<SearchItem> = [
  { id: '1', title: 'React 동시성 렌더링' },
  { id: '2', title: 'React Query Suspense' },
  { id: '3', title: 'useDeferredValue 검색' },
];

async function searchAPI(query: string): Promise<Array<SearchItem>> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const normalizedQuery = query.toLowerCase();

  return SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(normalizedQuery),
  );
}

function AsyncSearchResults({ query }: { query: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ['search', query],
    queryFn: () => searchAPI(query),
  });

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Suspense fallback={<div>검색 중...</div>}>
        <AsyncSearchResults query={deferredQuery} />
      </Suspense>
    </div>
  );
}
