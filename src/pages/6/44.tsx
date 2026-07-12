import { Suspense, useDeferredValue, useState, useTransition } from 'react';
import type { ChangeEvent } from 'react';

interface ResultItem {
  id: string;
  title: string;
  category: string;
  price: number;
}

const RESULTS: Array<ResultItem> = [
  { id: '1', title: 'Laptop', category: 'electronics', price: 1200 },
  { id: '2', title: 'React Book', category: 'books', price: 32 },
  { id: '3', title: 'Keyboard', category: 'electronics', price: 90 },
];

function ResultsSkeleton() {
  return <div>결과를 불러오는 중...</div>;
}

function SearchResults({
  query,
  category,
  sortBy,
}: {
  query: string;
  category: string;
  sortBy: string;
}) {
  const normalizedQuery = query.toLowerCase();
  const filteredResults = RESULTS.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === 'all' || item.category === category;

    return matchesQuery && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }

    return a.title.localeCompare(b.title);
  });

  return (
    <ul>
      {filteredResults.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default function AdvancedSearchPage() {
  // 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const [isPending, startTransition] = useTransition();
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // 검색어 변경: 가장 긴급
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // 즉시 반영 (입력 필드)
  };

  // 필터/정렬 변경: 비긴급
  const handleCategoryChange = (newCategory: string) => {
    startTransition(() => {
      setCategory(newCategory);
    });
  };

  const handleSortChange = (newSort: string) => {
    startTransition(() => {
      setSortBy(newSort);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1순위: 검색어 입력 (긴급) */}
      <input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="검색어를 입력하세요"
        className="border p-2"
      />

      {/* 2순위: 필터/정렬 (비긴급) */}
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          disabled={isPending}
        >
          <option value="all">전체</option>
          <option value="electronics">전자기기</option>
          <option value="books">도서</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          disabled={isPending}
        >
          <option value="relevance">관련도순</option>
          <option value="price">가격순</option>
          <option value="newest">최신순</option>
        </select>

        {isPending && (
          <span className="text-sm text-gray-500">필터링 중...</span>
        )}
      </div>

      {/* 3순위: 검색 결과 (deferredSearchTerm 사용) */}
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults
          query={deferredSearchTerm}
          category={category}
          sortBy={sortBy}
        />
      </Suspense>
    </div>
  );
}
