import { cn } from 'tailwind-variants';

type Props = Record<string, unknown>;

export function mergeProps(slotProps: Props, childProps: Props): Props {
  const merged = { ...childProps };

  for (const propName in slotProps) {
    const slotProp = slotProps[propName];
    const childProp = merged[propName];

    // 1. 이벤트 핸들러 체이닝
    if (
      /^on[A-Z]/.test(propName) &&
      typeof slotProp === 'function' &&
      typeof childProp === 'function'
    ) {
      merged[propName] = (...args: Array<unknown>) => {
        // 자식 핸들러 먼저 실행
        (childProp as Function)(...args);

        // 이벤트 객체가 있고, defaultPrevented가 호출되지 않았을 때만 부모 핸들러 실행
        const e = args[0] as React.SyntheticEvent | undefined;
        if (e && !e.defaultPrevented) {
          (slotProp as Function)(...args);
        }
      };
    }
    // 2. 스타일 병합 (자식 스타일이 우선)
    else if (
      propName === 'style' &&
      slotProp &&
      childProp &&
      typeof slotProp === 'object' &&
      typeof childProp === 'object'
    ) {
      merged[propName] = {
        ...(slotProp as React.CSSProperties),
        ...(childProp as React.CSSProperties),
      };
    }
    // 3. className 병합 (tailwind-merge 활용)
    else if (
      propName === 'className' &&
      typeof slotProp === 'string' &&
      typeof childProp === 'string'
    ) {
      merged[propName] = cn(slotProp, childProp);
    }
    // 4. 일반 속성 (자식이 없으면 부모 속성 사용)
    else if (merged[propName] === undefined) {
      merged[propName] = slotProp;
    }
  }

  return merged;
}

// Refs 합성 유틸
export function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        ref.current = node;
      }
    });
  };
}
