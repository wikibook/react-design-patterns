import { useCallback, useState } from 'react';

interface UseCountReturn {
  count: number;
  handleIncrease: (step?: number) => void;
  handleDecrease: (step?: number) => void;
  handleReset: () => void;
  handleSet: (value: number) => void;
}

export function useCount(initialValue: number = 0): UseCountReturn {
  const [count, setCount] = useState<number>(initialValue);

  const handleIncrease = useCallback(
    (step = 1) => {
      setCount((prev) => prev + step);
    },
    [setCount],
  );

  const handleDecrease = useCallback(
    (step = 1) => {
      setCount((prev) => prev - step);
    },
    [setCount],
  );

  const handleReset = useCallback(() => {
    setCount(initialValue);
  }, [setCount, initialValue]);

  const handleSet = useCallback(
    (value: number) => {
      setCount(value);
    },
    [setCount],
  );

  return { count, handleIncrease, handleDecrease, handleReset, handleSet };
}

export default function Page() {
  const { count, handleIncrease, handleDecrease, handleReset, handleSet } =
    useCount();
  const [number, setNumber] = useState(0);

  return (
    <>
      <div>count: {count}</div>
      <button onClick={() => handleIncrease()}>+1</button>
      <button onClick={() => handleDecrease()}>-1</button>
      <button onClick={() => handleReset()}>reset</button>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <button onClick={() => handleSet(number)}>set input number</button>
    </>
  );
}
