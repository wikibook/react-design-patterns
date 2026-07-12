import { useEffect, useState, useTransition } from 'react';
import type { ChangeEvent } from 'react';

function DelayedFallback({ delay = 500 }: { delay?: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;
  return <div className="text-gray-500">로딩 중...</div>;
}

function SearchResults({ query }: { query: string }) {
  return <div>{query}에 대한 검색 결과</div>;
}

export default function SearchPage() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;

    setInput(next);
    startTransition(() => {
      setQuery(next);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending && <DelayedFallback delay={500} />}
      <SearchResults query={query} />
    </div>
  );
}
