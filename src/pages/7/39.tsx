import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  return <p>{seconds}초 동안 타이머가 실행 중입니다.</p>;
}

export default function MemoryCleanupExample() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <h1>메모리 누수 방지 cleanup</h1>
      <button type="button" onClick={() => setIsVisible((value) => !value)}>
        타이머 토글
      </button>
      {isVisible ? <Timer /> : <p>타이머가 언마운트되었습니다.</p>}
    </div>
  );
}
