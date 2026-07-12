import { useDeferredValue, useState, useTransition } from 'react';
import type { ChangeEvent } from 'react';

function Spinner() {
  return <div>Loading...</div>;
}

function HeavyList({ query }: { query: string }) {
  return <div>{query} 결과를 렌더링합니다.</div>;
}

// useTransition 방식 (입력값은 긴급 상태로 유지)
function ParentWithTransition() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setInput(next); // 긴급 업데이트: 제어 입력은 즉시 반영
    startTransition(() => {
      setQuery(next); // 비긴급 업데이트: 무거운 리스트 갱신용
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending && <Spinner />}
      <HeavyList query={query} />
    </>
  );
}

// useDeferredValue 방식
function ParentWithDeferred() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {query !== deferredQuery && <Spinner />}
      <HeavyList query={deferredQuery} />
    </>
  );
}

export default function ComparisonPage() {
  return (
    <div>
      <section>
        <h2>useTransition 방식</h2>
        <ParentWithTransition />
      </section>
      <section>
        <h2>useDeferredValue 방식</h2>
        <ParentWithDeferred />
      </section>
    </div>
  );
}
