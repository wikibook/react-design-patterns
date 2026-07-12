// pnpm exec tsx src/pages/4/62.ts

import { keygen } from './51';


function log<This, Args extends Array<any>, Return>() {
  console.log('[factory] log');
  return function (
    value: (this: This, ...args: Args) => Return,
    _context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ) {
    console.log('[apply] log');
    return function (this: This, ...args: Args): Return {
      console.log('[runtime] log');
      return value.apply(this, args);
    };
  };
}


function cache<This, Args extends Array<any>, Return>(ttl: number) {
  console.log('[factory] cache');
  return function (
    value: (this: This, ...args: Args) => Return,
    _context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ) {
    console.log('[apply] cache');
    const cacheMap = new Map<string, { value: Return; timestamp: number }>();

    return function (this: This, ...args: Args): Return {
      const now = Date.now();
      const key = keygen(args);
      const cached = cacheMap.get(key);

      if (cached && now - cached.timestamp < ttl) {
        console.log('[runtime] cache hit');
        return cached.value;
      }
      console.log('[runtime] cache miss');
      const result = value.apply(this, args);
      cacheMap.set(key, { value: result, timestamp: now });
      return result;
    };
  };
}

export class Example {
  @log()
  @cache(1000)
  run(a: number, b: number) {
    console.log('[runtime] method');
    return a + b;
  }
}

const ex = new Example();
ex.run(1, 2);
