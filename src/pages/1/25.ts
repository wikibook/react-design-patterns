type Listener = () => void;

export abstract class Store<T> {
  protected listeners = new Set<Listener>();
  protected value: T;

  constructor(protected initialValue: T) {
    this.value = initialValue;
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

  getServerSnapshot = () => {
    return this.initialValue;
  };

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
