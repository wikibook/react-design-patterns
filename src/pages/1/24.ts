import { create } from 'zustand';

interface CounterStore {
  count: number;
  setCount: (value: number) => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  setCount: (value) => set({ count: value }),
}));
