import { useState } from 'react';

export default function Page() {
  const [value, setValue] = useState(0);

  const handleClick = () => {
    setValue((value) => value + 1);
  };

  return (
    <FiberNodeChecker>
      <div>Value: {value}</div>
      <input />
      <button onClick={handleClick}>Increment</button>
    </FiberNodeChecker>
  );
}

function FiberNodeChecker({ children }: { children: React.ReactNode }) {
  console.log(
    (children as Array<React.ReactElement & { _owner: unknown }>)[0]._owner,
  ); // Page 컴포넌트의 FiberNode를 확인할 수 있다.

  return children;
}
