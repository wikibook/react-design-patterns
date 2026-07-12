// pnpm exec tsx src/pages/4/60.ts

import { keygen } from './51';

export function cache(ttl: number) {
  
  return function <This, Args extends Array<any>, Return>(
    value: (this: This, ...args: Args) => Return,
    _context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ) {
    const cacheMap = new Map<string, { value: Return; timestamp: number }>();

    return function (this: This, ...args: Args): Return {
      const now = Date.now();
      const key = keygen(args);

      const cached = cacheMap.get(key);

      if (cached && now - cached.timestamp < ttl) {
        console.log('cache hit');
        return cached.value;
      } else {
        console.log('cache miss');
      }

      const result = value.apply(this, args);
      cacheMap.set(key, { value: result, timestamp: now });

      return result;
    };
  };
}

class Calculator {
  @cache(1000) // 1초 TTL
  sum(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();

calc.sum(1, 2); // cache miss
calc.sum(1, 2); // cache hit
