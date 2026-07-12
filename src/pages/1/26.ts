import { useSyncExternalStore } from 'react';
import { Store } from './25';

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
    store.subscribe.bind(store),
    store.getSnapshot.bind(store),
    store.getServerSnapshot.bind(store),
  );

  return {
    count: state,
    handleIncrease: store.handleIncrease.bind(store),
    handleDecrease: store.handleDecrease.bind(store),
    handleReset: store.handleReset.bind(store),
    handleSet: store.handleSet.bind(store),
  };
}
