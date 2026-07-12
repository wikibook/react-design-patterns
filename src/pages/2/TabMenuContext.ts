import { createContext } from 'react';

export const TabMenuContext = createContext<{
  currentTab: string;
  disabled: Array<string>;
} | null>(null);
