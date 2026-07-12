import { useReducer, useState } from 'react';

export type CountReducerAction =
  | { type: 'increment'; step?: number }
  | { type: 'decrement'; step?: number }
  | { type: 'reset'; initial: number }
  | { type: 'set'; value: number };

export function countReducer(
  state: number,
  action: CountReducerAction,
): number {
  switch (action.type) {
    case 'increment':
      return state + (action.step ?? 1);
    case 'decrement':
      return state - (action.step ?? 1);
    case 'reset':
      return action.initial;
    case 'set':
      return action.value;
    default:
      return state;
  }
}

export default function Page() {
  const [count, dispatch] = useReducer(countReducer, 0);
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
