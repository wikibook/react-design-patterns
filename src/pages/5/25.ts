import { Bar } from './23';
import { RemoveIndexSignature } from './24';

export type Result = RemoveIndexSignature<Bar>;
//   ~~~~~~ { bar(): void; 0: string; }
