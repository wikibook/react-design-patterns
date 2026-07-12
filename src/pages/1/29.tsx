import { useState, useSyncExternalStore } from 'react';
import { CountStore } from './27';

export function useCount() {
  const [store] = useState(() => new CountStore(0));

  const state = useSyncExternalStore(
    store.subscribe.bind(store),
    store.getSnapshot.bind(store),
    store.getServerSnapshot.bind(store),
  );

  return [state, store.dispatch.bind(store)] as const;
}

export default function Page() {
  const [count, dispatch] = useCount();

  const handleDecrease = () => dispatch({ type: 'decrement' });
  const handleReset = () => dispatch({ type: 'reset', initial: 0 });
  const handleSet = (value: number) => dispatch({ type: 'set', value });

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={handleDecrease}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => handleSet(10)}>Set to 10</button>
    </div>
  );
}
