import { useEffect, useState } from 'react';

export default function EventListenerCleanupExample() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h1>이벤트 리스너 cleanup</h1>
      <p>현재 브라우저 너비: {width}px</p>
    </div>
  );
}
