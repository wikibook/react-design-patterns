import { useCounter } from './globalState';

export function Counter() {
  const [count, setCount] = useCounter();

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+1</button>
    </div>
  );
}