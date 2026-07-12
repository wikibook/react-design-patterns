type Listener = () => void;

export function createStore<T>(initialValue: T) {
  let value = initialValue;
  const listeners = new Set<Listener>();

  return {
    getSnapshot: () => value,
    getServerSnapshot: () => initialValue, // SSR에서 사용할 초기 스냅샷
    setValue: (next: T | ((prev: T) => T)) => {
      if (typeof next === 'function') {
        value = (next as (prev: T) => T)(value);
      } else {
        value = next;
      }
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener); // 구독 해제 함수 반환
    },
  };
}
