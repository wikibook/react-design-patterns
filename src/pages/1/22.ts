import { useSyncExternalStore } from 'react';
import { createStore } from './21';

export function createGlobalState<T>(initialValue: T) {
  // 1. 모듈 스코프에서 스토어를 한 번만 생성
  const store = createStore(initialValue);

  // 2. 실제 사용할 리액트 훅 반환
  return () => {
    // 3. 반환되는 리액트 훅은 클로저를 통해 동일한 store를 구독함
    const state = useSyncExternalStore(
      store.subscribe,
      store.getSnapshot,
      store.getServerSnapshot,
    );

    // 4. 상태값과 setter 반환
    return [state, store.setValue] as const;
  };
}
