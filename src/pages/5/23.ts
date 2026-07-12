import { RemoveIndexSignature } from './22';

export type Bar = {
  [key: number]: unknown;
  bar(): void;
  0: string;
};

export type Result = RemoveIndexSignature<Bar>;
