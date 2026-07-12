import { useState, useTransition } from 'react';

const ALL_RESULTS = [
  'React',
  'React Query',
  'Redux',
  'Recoil',
  'Router',
  'Rendering',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(ALL_RESULTS);
  const [isPending, startTransition] = useTransition();

  const filterResults = (value: string) => {
    const normalizedValue = value.toLowerCase();

    return ALL_RESULTS.filter((item) =>
      item.toLowerCase().includes(normalizedValue),
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    // 긴급: 입력 필드 즉시 업데이트
    setQuery(newQuery);

    // 비긴급: 검색 결과 상태 반영은 Transition으로
    startTransition(() => {
      setSearchResults(filterResults(newQuery));
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
      />
      {isPending && <span className="ml-2 text-gray-500">검색 중...</span>}
      <ul>
        {searchResults.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
    </div>
  );
}
