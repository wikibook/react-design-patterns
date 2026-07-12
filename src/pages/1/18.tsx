import { useReducer, useState } from 'react';
import { temperatureReducer } from './17';

export default function Page() {
  const [count, dispatch] = useReducer(temperatureReducer, 0);
  const [number, setNumber] = useState(0);

  return (
    <>
      <div>count: {count}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset', initial: 0 })}>
        reset
      </button>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <button onClick={() => dispatch({ type: 'set', value: number })}>
        set input number
      </button>
    </>
  );
}
