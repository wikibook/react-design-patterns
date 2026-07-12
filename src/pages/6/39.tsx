import type { ChangeEvent } from 'react';
import { startTransition, useState } from 'react';

function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    // 긴급: 입력 이벤트에서 현재 값을 읽음
    // 비긴급: 부모의 상태 업데이트를 유도하는 검색 콜백 호출
    startTransition(() => {
      onSearch(query);
    });
  };

  return <input onChange={handleChange} />;
}

export default function SearchInputPage() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <SearchInput onSearch={setQuery} />
      <p>검색어: {query}</p>
    </div>
  );
}
