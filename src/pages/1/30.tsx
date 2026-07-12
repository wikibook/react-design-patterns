import { useSyncExternalStore } from 'react';

type Listener = () => void;

export abstract class Store<T> {
  protected listeners = new Set<Listener>();
  protected value: T;

  constructor(protected initialValue: T) {
    this.value = initialValue;
    this.constructorAutoBind();
  }

  private constructorAutoBind() {
    const boundNames = new Set<string>();
    let proto = Object.getPrototypeOf(this);

    while (proto && proto !== Object.prototype) {
      const names = Object.getOwnPropertyNames(proto);

      for (const name of names) {
        if (name === 'constructor' || boundNames.has(name)) continue;

        const desc = Object.getOwnPropertyDescriptor(proto, name);
        if (!desc) continue;

        const value = desc.value;
        if (typeof value === 'function') {
          // assign bound function to instance
          Object.defineProperty(this, name, {
            value: value.bind(this),
            configurable: true,
            writable: true,
          });
          boundNames.add(name);
        }
      }

      proto = Object.getPrototypeOf(proto);
    }
  }

  // 상태 업데이트: this.value 사용, 변경 없으면 알림 생략(선택)
  setValue(next: T | ((prev: T) => T)) {
    const nextValue =
      typeof next === 'function' ? (next as (prev: T) => T)(this.value) : next;

    // 불필요한 리렌더링 방지를 위해 변경이 없으면 통지 생략
    if (Object.is(nextValue, this.value)) return;

    this.value = nextValue;
    this.listeners.forEach((listener) => listener());
  }

  getSnapshot() {
    return this.value;
  }

  getServerSnapshot() {
    return this.initialValue;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

class CountStore extends Store<number> {
  constructor(value: number) {
    super(value);
  }

  public handleIncrease(step = 1) {
    this.setValue((prevValue) => prevValue + step);
  }

  public handleDecrease(step = 1) {
    this.setValue((prevValue) => prevValue - step);
  }

  public handleReset() {
    this.setValue(this.initialValue);
  }

  public handleSet(value: number) {
    this.setValue(value);
  }
}

const store = new CountStore(0);

export function useGlobalCount() {
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return {
    count: state,
    handleIncrease: store.handleIncrease,
    handleDecrease: store.handleDecrease,
    handleReset: store.handleReset,
    handleSet: store.handleSet,
  };
}

export default function Page() {
  const { count, handleIncrease, handleDecrease, handleReset, handleSet } =
    useGlobalCount();

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => handleIncrease()}>Increase</button>
      <button onClick={() => handleDecrease()}>Decrease</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => handleSet(100)}>Set to 100</button>
    </div>
  );
}
