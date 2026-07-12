import { useEffect, useState, type ReactElement } from 'react';
import { Slot } from './19';

type SlideInType = 'easeIn' | 'easeInOut' | 'linear';
type SlideInProps = {
  type?: SlideInType;
  duration?: number;
  children: ReactElement;
};

const timingFunctionMap: Record<SlideInType, string> = {
  easeIn: 'ease-in',
  easeInOut: 'ease-in-out',
  linear: 'linear',
};

export function SlideIn({
  type = 'easeIn',
  duration = 240,
  children,
}: SlideInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <Slot
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity ${duration}ms ${timingFunctionMap[type]}, transform ${duration}ms ${timingFunctionMap[type]}`,
      }}
    >
      {children}
    </Slot>
  );
}

export default function Page() {
  return (
    <>
      <SlideIn type="easeIn" duration={500}>
        <h1>제목</h1>
      </SlideIn>

      <SlideIn type="easeInOut" duration={1000}>
        <button>버튼</button>
      </SlideIn>

      <SlideIn type="linear" duration={1500}>
        <span className="...">안녕하세요</span>
      </SlideIn>
    </>
  );
}
