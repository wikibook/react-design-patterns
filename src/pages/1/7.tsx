import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <>
      <div>Count: {count}</div>
      <button onClick={increment}>+</button>
    </>
  );
}
